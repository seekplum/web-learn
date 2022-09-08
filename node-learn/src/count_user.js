/** @format */
// @Owner: huangjiandong

const moment = require('moment');
import { TEST_DB, ORDER_DB } from 'astrDataSources';

// const { MongoClient } = require('mongodb');
// const TEST_DB_URL = 'mongodb://localhost:27017/';

const endOf2021 = moment('2021-12-31').endOf('day');
const endOf2022Half = moment('2022-06-30').endOf('day');
const format = 'YYYY-MM-DD HH:mm:ss';

async function calc(db, orderDB, endOfDay) {
  const countByUser = await db.collection('user').countDocuments({ created: { $lte: moment(endOfDay).toDate() } });
  console.log('count by user:', endOfDay.format(format), countByUser);

  const orders = await orderDB
    .collection('vas_order')
    .aggregate(
      [
        {
          $match: {
            order_cycle_start: { $lte: moment(endOfDay).toDate() },
          },
        },
        {
          $group: {
            _id: '$nick',
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ],
      { allowDiskUse: true }
    )
    .toArray();
  console.log('count by order:', endOfDay.format(format), orders[0]['count']);
}

async function work() {
  // const testDB = await MongoClient.connect(TEST_DB_URL, {
  //   poolSize: 1,
  //   useUnifiedTopology: true,
  // });

  // const TEST_DB = testDB.db('testdb');
  // const ORDER_DB = TEST_DB;

  await calc(TEST_DB, ORDER_DB, endOf2021);
  console.log('');
  await calc(TEST_DB, ORDER_DB, endOf2022Half);

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
