/** @format */
// @Owner: huangjiandong

import { TEST_DB } from 'astrDataSources';

// const { MongoClient } = require('mongodb');
// const TEST_DB_URL = 'mongodb://localhost:27017/';

const moment = require('moment');
const bannerCreateStart = moment('2020-02-27').add(8, 'hours');
const flowCreateStart = moment('2020-02-27').add(8, 'hours');

async function getBannerUsers(db, page_no) {
  page_no = page_no || 1;
  const data = await db
    .collection('discount_act')
    .aggregate([
      {
        $match: {
          created: { $gt: bannerCreateStart.toDate() },
          style_m: 1,
          act_type: { $in: ['mjs', 'fmjs'] },
          status: { $in: [0, 1, 2, 3] },
        },
      },
      { $project: { _id: 0, uid: 1 } },
      {
        $lookup: {
          // 左连接
          from: 'user', // 被关联表
          let: { act_uid: '$uid' },
          pipeline: [
            { $match: { $expr: { $eq: ['$uid', '$$act_uid'] } } },
            { $match: { shop_type: 'B' } },
            { $project: { _id: 0, nick: 1 } },
            { $group: { _id: '$nick' } },
          ],
          as: 'user',
        },
      },
      { $match: { user: { $ne: [] } } },
      { $group: { _id: '$uid', act_count: { $sum: 1 }, user: { $first: '$user' } } },
    ])
    .toArray();
  return data;
}

async function getFlowUsers(db, page_no) {
  page_no = page_no || 1;
  const data = await db
    .collection('discount_act')
    .aggregate([
      {
        $match: {
          created: { $gt: flowCreateStart.toDate() },
          flowNum: { $gt: 0 },
          act_type: { $in: ['mjs', 'fmjs'] },
          status: { $in: [0, 1, 2, 3] },
        },
      },
      { $project: { _id: 0, uid: 1 } },
      {
        $lookup: {
          // 左连接
          from: 'user', // 被关联表
          let: { act_uid: '$uid' },
          pipeline: [
            { $match: { $expr: { $eq: ['$uid', '$$act_uid'] } } },
            { $project: { _id: 0, nick: 1 } },
            { $group: { _id: '$nick' } },
          ],
          as: 'user',
        },
      },
      { $match: { user: { $ne: [] } } },
      { $group: { _id: '$uid', act_count: { $sum: 1 }, user: { $first: '$user' } } },
    ])
    .toArray();
  return data;
}

async function calc(db) {
  const bannerUsers = await getBannerUsers(db);
  let bannerCount = 0;
  for (const user of bannerUsers) {
    bannerCount += user.act_count;
    console.log('uid:', user._id, 'nick:', user.user[0]._id, user.act_count);
  }
  console.log('用户数:', bannerUsers.length, '手机横幅活动数:', bannerCount);
  console.log('=============================================================');
  const flowUsers = await getFlowUsers(db);
  let flowCount = 0;
  for (const user of flowUsers) {
    flowCount += user.act_count;
    console.log('uid:', user._id, 'nick:', user.user[0]._id, user.act_count);
  }
  console.log('用户数:', flowUsers.length, '送流量活动数:', flowCount);
}

async function work() {
  // const testDB = await MongoClient.connect(TEST_DB_URL, {
  //   poolSize: 1,
  //   useUnifiedTopology: true,
  // });

  // const TEST_DB = testDB.db('testdb');
  await calc(TEST_DB);

  // testDB.close();
}

await work();

// async function main() {
//   await work();
// }

// if (require.main === module) {
//   main().catch((e) =>
//     setTimeout(() => {
//       throw e;
//     })
//   );
// }
