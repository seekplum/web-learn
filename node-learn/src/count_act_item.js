/** @format */
// @Owner: huangjiandong

// import { TEST_DB, LOG_DB } from 'astrDataSources';

const moment = require('moment');
// const startOfToday = moment('2022-10-31').startOf('day');
// const endOfToday = moment(startOfToday).endOf('day');
const startOfToday = moment('2019-05-14').startOf('day');
const endOfToday = moment('2023-11-04').endOf('day');
const format = 'YYYY-MM-DD HH:mm:ss';

console.log('startOfToday:', startOfToday.format(format), 'endOfToday:', endOfToday.format(format));

const { MongoClient } = require('mongodb');
const TEST_DB_URL = 'mongodb://localhost:27017/';

const collection2Types = {
  discount_log: ['zhekou', 'skuzhekou'], // 折扣1.0、 SKU1.0
  discount_sub_act_item_v2_log: ['zhekouv2', 'zhekouv3', 'skuzhekouv3', 'zszhekouv1', 'zszhekouv2', 'zszhekouv3'], // 折扣2.0、 SKU2.0、折上折
  circle_discount_detail_log: ['circlezhekou'], // 循环打折1.0
  circle_discount_item_log_v2: ['circlezhekouv2'], // 循环打折2.0
  // mjs_range_log_v2: ['mjs'], // 满减1.0
  promotion_mjs_detail_log: ['secondzhekou', 'mjsv1', 'mjsv2'], // 第二件促销、满减2.0
};

const collection2Name = {
  discount_log: '折扣常规版/SKU尊享版',
  discount_sub_act_item_v2_log: '折扣尊享旗舰版/SKU旗舰版',
  circle_discount_detail_log: '循环打折1.0',
  circle_discount_item_log_v2: '循环打折2.0',
  mjs_range_log_v2: '满减常规版',
  promotion_mjs_detail_log: '第二件促销、满减尊享旗舰版',
};

async function getFActs(db) {
  const data = await db
    .collection('discount_act')
    .aggregate(
      [
        {
          $match: {
            // created、ended、stopped 三个字段含有索引
            ended: {
              $gte: moment(startOfToday).add(8, 'hours').toDate(),
              $lte: moment(endOfToday).add(8, 'hours').toDate(),
            },
            $or: [
              {
                stopped: {
                  $gte: moment(startOfToday).add(8, 'hours').toDate(),
                  $lte: moment(endOfToday).add(8, 'hours').toDate(),
                },
              },
              { stopped: null },
            ],
            act_type: { $in: ['fmjs', 'fzhekou'] },
          },
        },
        {
          $project: {
            _id: 0,
            uid: 1,
            act_type: 1,
          },
        },
        { $group: { _id: { uid: '$uid', act_type: '$act_type' }, count: { $sum: 1 } } },
      ],
      { allowDiskUse: true }
    )
    .toArray();
  return data;
}

async function getUsers(db, uids) {
  const users = await db
    .collection('user')
    .find(
      {
        uid: { $in: uids },
      },
      {
        projection: {
          _id: 0,
          uid: 1,
          nick: 1,
          session: 1,
        },
      }
    )
    .toArray();

  return users;
}

async function getActIds(db, uids) {
  const acts = await db
    .collection('discount_act')
    .aggregate(
      [
        {
          $match: {
            ended: {
              $gte: moment(startOfToday).add(8, 'hours').toDate(),
              $lte: moment(endOfToday).add(8, 'hours').toDate(),
            },
            $or: [
              {
                stopped: {
                  $gte: moment(startOfToday).add(8, 'hours').toDate(),
                  $lte: moment(endOfToday).add(8, 'hours').toDate(),
                },
              },
              { stopped: null },
            ],
            uid: { $nin: uids },
          },
        },

        {
          $project: {
            _id: 1,
            act_type: 1,
          },
        },
        { $group: { _id: '$act_type', aids: { $push: '$_id' } } },
      ],
      { allowDiskUse: true }
    )
    .toArray();
  return acts.reduce((acc, act) => {
    acc[act._id] = act.aids;
    return acc;
  }, {});
}

function flattenDeep(arrs) {
  return arrs.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)), []);
}

async function getItemCounts(db, logDB, uids) {
  const actType2Aids = await getActIds(db, uids);
  const collection2Aids = Object.keys(collection2Types).reduce((acc, collection) => {
    const aids = collection2Types[collection].map((atype) => actType2Aids[atype] || []);
    const flatAids = flattenDeep(aids);
    acc[collection] = flatAids;
    return acc;
  }, {});
  const vals = {};
  const mjs_res = await logDB
    .collection('mjs_range_log_v2')
    .aggregate(
      [
        {
          $match: {
            act_id: { $in: actType2Aids['mjs'] || [] },
            join: true,
          },
        },
        { $unwind: '$iids' },

        { $group: { _id: null, iids: { $addToSet: '$iids' } } },
        {
          $project: {
            _id: 0,
            count: { $cond: { if: { $isArray: '$iids' }, then: { $size: '$iids' }, else: 0 } },
          },
        },
      ],
      { allowDiskUse: true }
    )
    .toArray();
  vals['mjs_range_log_v2'] = mjs_res && mjs_res.length > 0 ? mjs_res[0]['count'] : 0;
  for (const collection of Object.keys(collection2Aids)) {
    const aids = collection2Aids[collection] || [];
    if (aids.length === 0) {
      console.log(collection, 'is empty');
      continue;
    }
    const res = await logDB
      .collection(collection)
      .aggregate([
        {
          $match: {
            act_id: { $in: aids },
          },
        },
        {
          $group: {
            _id: { num_iid: '$num_iid', sku_id: '$sku_id' },
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();
    vals[collection] = res && res.length > 0 ? res[0]['count'] : 0;
  }
  return vals;
}

async function calc(db, logDB) {
  const facts = await getFActs(db);
  console.log('全店活动数量:', facts.length);
  const uids = Array.from(new Set(facts.map((x) => x._id.uid)));
  const users = await getUsers(db, uids);
  console.log('全店活动对应用户数量:', users.length);
  const itemCounts = await getItemCounts(db, logDB, uids);
  let totalItem = 0;
  for (const k of Object.keys(itemCounts)) {
    totalItem += itemCounts[k];
  }
  console.log('商品总量:', totalItem);
  console.log('商品分布:');
  for (const c of Object.keys(itemCounts)) {
    console.log('    ', collection2Name[c] + ':', itemCounts[c]);
  }
  // 打印全量用户信息
  console.log('[');
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const prefix = '    ';
    const suffix = i == users.length - 1 ? '' : ',';
    console.log(prefix + JSON.stringify(user) + suffix);
  }
  console.log(']');
}

async function work() {
  const testDB = await MongoClient.connect(TEST_DB_URL, {
    // poolSize: 1,
    useUnifiedTopology: true,
  });

  const TEST_DB = testDB.db('testdb');
  const LOG_DB = TEST_DB;
  await calc(TEST_DB, LOG_DB);

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
