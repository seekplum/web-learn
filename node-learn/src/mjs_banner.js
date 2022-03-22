/** @format */
// @Owner: huangjiandong

// import { TEST_DB } from 'astrDataSources';

const ACT_STATUS_NOT_STARTED = 9;
const moment = require('moment');
const now = moment().add(8, 'hours');
const startOfToday = moment().startOf('day');
const endOfToday = moment(startOfToday).add(1, 'days');

const { MongoClient } = require('mongodb');
const TEST_DB_URL = 'mongodb://localhost:27017/';

async function getActs(db) {
  const data = await db
    .collection('discount_act')
    .aggregate([
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
    ])
    .toArray();
  return data;
}

async function calc(db) {
  const acts = await getActs(db);
  for (const act of acts) {
    const vals = [
      moment(startOfToday).add(8, 'hours').format('YYYY-MM-DD'),
      act.uid,
      act.act_type,
      moment(act.started) > now.toDate() ? ACT_STATUS_NOT_STARTED : act.status,
      act.style || 0,
      act.style_m || 0,
      act.style_with_mshow || 0,
      // 早期用户可能没有 level 这个字段，定义为19，用于区分
      act.user[0]._id || 19,
    ];
    console.log(vals);
  }
}

async function work() {
  const testDB = await MongoClient.connect(TEST_DB_URL, {
    poolSize: 1,
    useUnifiedTopology: true,
  });

  const TEST_DB = testDB.db('testdb');
  await calc(TEST_DB);

  testDB.close();
}

// await work();

async function main() {
  await work();
}

if (require.main === module) {
  main().catch((e) =>
    setTimeout(() => {
      throw e;
    })
  );
}
