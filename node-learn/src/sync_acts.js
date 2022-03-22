/**
 * 表结构：
CREATE TABLE `test_mjs_banner` (
    `date` DATE NOT NULL COMMENT '日期',
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键，不关注内容',
    `uid` BIGINT NOT NULL COMMENT '用户淘宝ID',
    `act_type` VARCHAR(16) NOT NULL COMMENT '活动类型',
    `status` INT NOT NULL COMMENT '活动状态',
    `style` INT NOT NULL COMMENT '电脑横幅模板',
    `style_m` INT NOT NULL COMMENT '是否添加手机横幅',
    `style_with_mshow` INT NOT NULL COMMENT '是否添加活动页链接',
    `level` INT NOT NULL COMMENT '用户版本',
    PRIMARY KEY (`date`, `id`)
)
DISTRIBUTE BY HASH(`id`)
INDEX_ALL='Y'
PARTITION BY VALUE(DATE_FORMAT(`date`, '%Y%m')) LIFECYCLE 120
STORAGE_POLICY='MIXED' hot_partition_count=2
COMMENT='统计满减横幅';
 */

import { ANALYTIC_DB_RW, TEST_DB } from 'astrDataSources';

const ACT_STATUS_NOT_STARTED = 9;
const moment = require('moment');
const now = moment().add(8, 'hours');
const sourceCol = TEST_DB.collection('discount_act');

await syncFromCursor(
  ANALYTIC_DB_RW,
  sourceCol.aggregate([
    {
      $match: {
        // created、ended、stopped 三个字段含有索引
        created: {
          $lt: moment(endOfToday).add(8, 'hours').toDate(),
        },
        ended: {
          $gte: moment(startOfToday).add(8, 'hours').toDate(),
        },
        stopped: null,
        act_type: { $in: ['mjs', 'mjsv1', 'mjsv2', 'fmjs'] },
        status: { $in: [0, 1, 2, 3] },
        archived: {
          $ne: true,
        },
      },
    },
    {
      $project: {
        _id: 0,
        uid: 1,
        act_type: 1,
        status: 1,
        style: 1,
        style_m: 1,
        style_with_mshow: 1,
        started: 1,
      },
    },
    {
      $lookup: {
        // 左连接
        from: 'user', // 被关联表
        let: { act_uid: '$uid' },
        pipeline: [
          { $match: { $expr: { $eq: ['$uid', '$$act_uid'] } } },
          { $project: { _id: 0, level: 1 } },
          { $group: { _id: '$level' } },
        ],
        as: 'user',
      },
    },
    { $match: { user: { $ne: [] } } },
  ]),
  'REPLACE INTO `test_mjs_banner` (`date`, `uid`, `act_type`, `status`, `style`, `style_m`, `style_with_mshow`, `level`) VALUES ?',
  (act) => [
    moment(startOfToday).add(8, 'hours').format('YYYY-MM-DD'),
    act.uid,
    act.act_type,
    moment(act.started) > now.toDate() ? ACT_STATUS_NOT_STARTED : act.status,
    act.style || 0,
    act.style_m || 0,
    act.style_with_mshow || 0,
    // 早期用户可能没有 level 这个字段，定义为19，用于区分
    act.user[0]._id || 19,
  ]
);
