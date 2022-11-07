/** @format */
// @Owner: huangjiandong

// import { MEIZHE_DB, LOG_DB, TEMP_OSS_RW } from 'astrDataSources';

const moment = require('moment');
const { stringify } = require('csv-stringify');
const { gzip } = require('zlib');

const startOfToday = moment('2021-01-01').startOf('day');
const endOfToday = moment('2021-12-31').endOf('day');
const format = 'YYYY-MM-DD HH:mm:ss';

console.log('startOfToday:', startOfToday.format(format), 'endOfToday:', endOfToday.format(format));

const { MongoClient } = require('mongodb');
const MEIZHE_DB_URL = 'mongodb://localhost:27017/';

const type2Collection = {
  zhekou: 'discount_log',
  skuzhekou: 'discount_log',
  zhekouv2: 'discount_sub_act_item_v2_log',
  zhekouv3: 'discount_sub_act_item_v2_log',
  skuzhekouv3: 'discount_sub_act_item_v2_log',
  zszhekouv1: 'discount_sub_act_item_v2_log',
  zszhekouv2: 'discount_sub_act_item_v2_log',
  zszhekouv3: 'discount_sub_act_item_v2_log',
  circlezhekou: 'circle_discount_detail_log',
  circlezhekouv2: 'circle_discount_item_log_v2',
  secondzhekou: 'promotion_mjs_detail_log',
  mjsv1: 'promotion_mjs_detail_log',
  mjsv2: 'promotion_mjs_detail_log',
};

async function getArchivedIds(db) {
  const results = [];
  for (let i = 0; i < 12; i += 1) {
    const startDay = moment(startOfToday).add(i, 'month').startOf('day');
    const endDay = moment(startDay).add(1, 'month').startOf('day');
    console.log('startDay:', startDay.format(format), 'endDay:', endDay.format(format));
    const data = await db
      .collection('discount_act')
      .aggregate(
        [
          {
            $match: {
              created: {
                $gte: moment(startDay).add(8, 'hours').toDate(),
                $lt: moment(endDay).add(8, 'hours').toDate(),
              },
              archived: true,
              act_type: { $nin: ['fmjs', 'fzhekou'] },
            },
          },
          {
            $project: {
              _id: 1,
              created: 1,
            },
          },
        ],
        { allowDiskUse: true }
      )
      .toArray();

    console.log(`${i + 1}月已归档活动ID总数:`, data.length);
    data.forEach((act) => {
      results.push([moment(act.created).format('YYYY-MM-DD'), `${act._id}`]);
    });
  }
  const OUTPUT_FILE = 'temp/archived_act_ids_2021_2.csv.gz';
  // 导出至临时目录
  const resultCsv = await new Promise((resolve) => stringify(results, (err, output) => resolve(output)));
  const gzippedBuffer = await new Promise((resolve) => gzip(resultCsv, (err, output) => resolve(output)));
  await TEMP_OSS_RW.put(OUTPUT_FILE, gzippedBuffer);

  const downloadUrl = await TEMP_OSS_RW.signatureUrl(OUTPUT_FILE);
  console.log('=> Url:', downloadUrl);
}

async function getActiveItemCounts(db, logDB) {
  for (let i = 0; i < 365; i += 1) {
    const startDay = moment(startOfToday).add(i, 'day').startOf('day');
    const endDay = moment(startDay).add(1, 'day').startOf('day');

    const acts = await db
      .collection('discount_act')
      .aggregate(
        [
          {
            $match: {
              created: {
                $gte: moment(startDay).add(8, 'hours').toDate(),
                $lte: moment(endDay).add(8, 'hours').toDate(),
              },
              archived: { $ne: true },
              act_type: { $nin: ['fmjs', 'fzhekou'] },
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

    const actType2Aids = acts.reduce((acc, act) => {
      acc[act._id] = act.aids;
      return acc;
    }, {});

    const vals = {};
    let totalItem = 0;
    const totalAct = Object.values(actType2Aids).reduce((acc, vals) => {
      return acc + vals.length;
    }, 0);
    const mjs_res = await logDB
      .collection('mjs_range_log_v2')
      .aggregate(
        [
          { $match: { act_id: { $in: actType2Aids['mjs'] || [] } } },
          { $unwind: '$iids' },
          { $group: { _id: null, count: { $sum: 1 } } },
        ],
        { allowDiskUse: true }
      )
      .toArray();
    const mjs_count = mjs_res && mjs_res.length > 0 ? mjs_res[0]['count'] : 0;
    totalItem += mjs_count;
    vals['mjs'] = mjs_count;

    for (const atype of Object.keys(type2Collection)) {
      const aids = actType2Aids[atype] || [];
      if (aids.length === 0) {
        vals[atype] = 0;
        continue;
      }
      const count = await logDB
        .collection(type2Collection[atype])
        .countDocuments({ act_id: { $in: actType2Aids[atype] } });
      totalItem += count;
      vals[atype] = count;
    }
    console.log(JSON.stringify([moment(startDay).format('YYYY-MM-DD'), totalAct, totalItem, vals]));
  }
}

async function calc(db, logDB) {
  console.log('start.');
  await getArchivedIds(db);

  await getActiveItemCounts(db, logDB);
  console.log('end.');
}

async function work() {
  const meizheDB = await MongoClient.connect(MEIZHE_DB_URL, {
    // poolSize: 1,
    useUnifiedTopology: true,
  });

  const MEIZHE_DB = meizheDB.db('meizhedb');
  const LOG_DB = MEIZHE_DB;
  await calc(MEIZHE_DB, LOG_DB);

  meizheDB.close();
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
