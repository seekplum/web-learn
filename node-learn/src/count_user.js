/** @format */
// @Owner: huangjiandong

const moment = require('moment');
import { TEST_DB } from 'astrDataSources';

// const { MongoClient } = require('mongodb');
// const TEST_DB_URL = 'mongodb://localhost:27017/';

const endOf2020 = moment('2020-12-31').endOf('day');
const endOf2021 = moment('2021-12-31').endOf('day');
const endOf2022 = moment('2022-12-31').endOf('day');
const format = 'YYYY-MM-DD HH:mm:ss';

console.log(
  'endOf2020:',
  endOf2020.format(format),
  'endOf2021:',
  endOf2021.format(format),
  'endOf2022:',
  endOf2022.format(format)
);

async function calc(db) {
  const count2020 = await db.collection('user').countDocuments({ created: { $lte: moment(endOf2020).toDate() } });
  const count2021 = await db.collection('user').countDocuments({ created: { $lte: moment(endOf2021).toDate() } });
  const count2022 = await db.collection('user').countDocuments({ created: { $lte: moment(endOf2022).toDate() } });
  console.log('count2020:', count2020, 'count2021:', count2021, 'count2022:', count2022);
}

async function work() {
//   const testDB = await MongoClient.connect(TEST_DB_URL, {
//     poolSize: 1,
//     useUnifiedTopology: true,
//   });

//   const TEST_DB = testDB.db('testdb');

  await calc(TEST_DB);

//   testDB.close();
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
