/** @format */
// @Owner: huangjiandong

// import { TEST_DB } from 'astrDataSources';

const moment = require('moment');
const endOfToday = moment().add(-40, 'days').startOf('day');
const startOfToday = moment(endOfToday).add(-2, 'years');

console.log('startOfToday:', startOfToday.format('YYYY-MM-DD'), 'endOfToday:', endOfToday.format('YYYY-MM-DD'));
const { MongoClient } = require('mongodb');
const TEST_DB_URL = 'mongodb://localhost:27017/';

async function getUserCount(db) {
  const data = await db
    .collection('discount_act')
    .aggregate([
      {
        $match: {
          // created、ended、stopped 三个字段含有索引
          stopped: {
            $gte: moment(startOfToday).add(8, 'hours').toDate(),
            $lte: moment(endOfToday).add(8, 'hours').toDate(),
          },
        },
      },
      {
        $project: {
          _id: 0,
          uid: 1,
        },
      },
      { $group: { _id: '$_id', uids: { $addToSet: '$uid' } } },
      {
        $project: {
          _id: 0,
          total: { $size: '$uids' },
        },
      },
    ])
    .toArray();

  return data.length ? data[0].total : 0;
}

async function getActs(db) {
  const data = await db
    .collection('discount_act')
    .aggregate([
      {
        $match: {
          // created、ended、stopped 三个字段含有索引
          stopped: {
            $gte: moment(startOfToday).add(8, 'hours').toDate(),
            $lte: moment(endOfToday).add(8, 'hours').toDate(),
          },
        },
      },
      {
        $project: {
          _id: 0,
          act_type: 1,
        },
      },
      { $group: { _id: '$act_type', count: { $sum: 1 } } },
    ])
    .toArray();
  return data;
}

async function getRowCount(db) {
  const collections = [
    'discount_log',
    'discount_sub_act_item_v2_log',
    'circle_discount_range_log',
    'circle_discount_detail_log',
    'mjs_range_log_v2',
    'promotion_mjs_log',
    'promotion_mjs_detail_log',
    'promotion_discount_detail_log',
    'circle_discount_item_log_v2',
    'circle_discount_cycle_log_v2',
  ];
  const vals = {};
  for (const collection of collections) {
    const length = await db.collection(collection).countDocuments();
    vals[collection] = length;
  }
  return vals;
}

async function calc(db) {
  const userCount = await getUserCount(db);
  console.log('总用户数:', userCount);
  const acts = await getActs(db);
  let totalAct = 0;
  const vals = {};

  for (const act of acts) {
    const { _id: act_type, count } = act;
    totalAct += count;
    vals[act_type] = count;
  }
  console.log('总活动数:', totalAct);
  console.log(vals);

  const lengths = await getRowCount(db);
  console.log('表数据总量:', lengths);
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
