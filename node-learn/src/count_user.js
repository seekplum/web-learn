/** @format */
// @Owner: huangjiandong

const moment = require('moment');
import { ORDER_DB } from 'astrDataSources';

// const { MongoClient } = require('mongodb');
// const TEST_DB_URL = 'mongodb://localhost:27017/';

const endOfDay = moment().endOf('day');

async function calc(orderDB) {
  const matchs = [
    {
      total_pay_fee: { $gt: 0 },
      order_cycle_start: { $lte: moment(endOfDay).toDate() },
    },
    {
      total_pay_fee: 0,
      order_cycle_start: { $lte: moment(endOfDay).toDate() },
    },
    {
      order_cycle_start: { $lte: moment(endOfDay).toDate() },
    },
  ];
  for (const match of matchs) {
    const orders = await orderDB
      .collection('vas_order')
      .aggregate(
        [
          {
            $match: match,
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
    const count = orders && orders.length > 0 ? orders[0]['count'] : 0;
    console.log(JSON.stringify(match), 'count by order:', count);
  }
}

async function work() {
  // const testDB = await MongoClient.connect(TEST_DB_URL, {
  //   // poolSize: 1,
  //   useUnifiedTopology: true,
  // });

  // const TEST_DB = testDB.db('testdb');
  // const ORDER_DB = TEST_DB;

  await calc(ORDER_DB);

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
