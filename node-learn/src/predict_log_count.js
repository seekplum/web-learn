/** @format */
// @Owner: huangjiandong

// import { TEST_DB, LOG_DB } from 'astrDataSources';

const moment = require('moment');
const endOfToday = moment().startOf('day');
const startOfToday = moment(endOfToday).add(-2, 'years');

console.log('startOfToday:', startOfToday.format('YYYY-MM-DD'), 'endOfToday:', endOfToday.format('YYYY-MM-DD'));
const { MongoClient } = require('mongodb');
const TEST_DB_URL = 'mongodb://localhost:27017/';

async function getActs(db) {
  const data = await db
    .collection('discount_act')
    .aggregate([
      {
        $match: {
          // created、ended、stopped 三个字段含有索引
          ended: {
            $gte: moment(endOfToday).add(8, 'hours').toDate(),
          },
          stopped: null,
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
async function getStoppedActs(db) {
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
  const collectionPairs = {
    discount_log: { actType: 'zhekou', spec: {} },
    discount_sub_act_item_v2_log: { actType: 'zhekou_v2', spec: {} },

    circle_discount_detail_log: { actType: 'circle', spec: {} },
    circle_discount_item_log_v2: { actType: 'circle_v2', spec: {} },

    mjs_range_log_v2: { actType: 'mjs', spec: {} },
    promotion_mjs_detail_log: { actType: 'mjs_v2', spec: {} },

    promotion_mjs_log: { actType: 'second', spec: { act_type: { $in: ['promo_mjs'] } } },
  };
  const vals = {};
  for (const collection of Object.keys(collectionPairs)) {
    const data = collectionPairs[collection];
    const { actType, spec = {} } = data;
    let length = 0;
    if (Object.keys(spec).length) {
      length = await db.collection(collection).find(spec).count();
    } else {
      length = await db.collection(collection).countDocuments();
    }
    vals[actType] = length;
  }
  return vals;
}

function parseActType(actType) {
  switch (actType) {
    case 'zhekou':
    case 'skuzhekou':
    case 'fzhekou':
      return 'zhekou';

    case 'zhekouv2':
    case 'zhekouv3':
    case 'skuzhekouv3':
    case 'zszhekouv1':
    case 'zszhekouv2':
    case 'zszhekouv3':
      return 'zhekou_v2';

    case 'circlezhekou':
      return 'circle';
    case 'circlezhekouv2':
      return 'circle_v2';

    case 'mjs':
    case 'fmjs':
      return 'mjs';

    case 'mjsv1':
    case 'mjsv2':
      return 'mjs_v2';

    case 'secondzhekou':
      return 'second';
    default:
      return 'unknown';
  }
}

function parseActs(acts) {
  let totalAct = 0;
  const vals = {};

  for (const act of acts) {
    const { _id, count } = act;
    const act_type = parseActType(_id);
    totalAct += count;
    if (vals[act_type]) {
      vals[act_type] += count;
    } else {
      vals[act_type] = count;
    }
  }
  return [totalAct, vals];
}

function calcActsCount(actsData, stoppedActsData, counts) {
  for (const actType of ['zhekou', 'zhekou_v2', 'circle', 'circle_v2', 'mjs', 'mjs_v2', 'second']) {
    const actCount = actsData[actType] || 1;
    const logCount = counts[actType] || 0;
    const historyCount = stoppedActsData[actType] || 0;
    console.log(
      actType,
      '当前数量:',
      actCount,
      logCount,
      '预估保留两年数据数量:',
      actCount + historyCount,
      logCount + Math.floor((logCount / actCount) * historyCount)
    );
  }
}

async function calc(db, logDB) {
  const acts = await getActs(db);
  const stoppedActs = await getStoppedActs(db);
  const [totalActs, actsData] = parseActs(acts);
  const [totalStoppedActs, stoppedActsData] = parseActs(stoppedActs);
  console.log('进行中活动数量:', totalActs, '两年内结束的活动数量:', totalStoppedActs);
  const counts = await getRowCount(logDB);
  console.log('log表数据总量:', counts);
  calcActsCount(actsData, stoppedActsData, counts);
}

async function work() {
  const testDB = await MongoClient.connect(TEST_DB_URL, {
    poolSize: 1,
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
