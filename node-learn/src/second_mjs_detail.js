/** @format */
// @Owner: huangjiandong

import { TEST_DB } from 'astrDataSources';

// const { MongoClient } = require('mongodb');
// const TEST_DB_URL = 'mongodb://localhost:27017/';

const MAX_ACT_SIZE = 30;

async function getPromoAct(db) {
  const details = await db
    .collection('promotion_mjs')
    .aggregate([{ $group: { _id: { uid: '$uid', act_type: '$act_type' }, count: { $sum: 1 } } }])
    .toArray();
  const result = {};
  for (const detail of details) {
    const {
      _id: { uid, act_type },
      count,
    } = detail;
    if (result.hasOwnProperty(uid)) {
      if (result[uid].hasOwnProperty(act_type)) {
        result[uid][act_type] += count;
      } else {
        result[uid][act_type] = count;
      }
    } else {
      result[uid] = {
        [act_type]: count,
      };
    }
  }
  return result;
}

async function getUsers(db, uids) {
  const users = await db
    .collection('user')
    .find(
      { uid: { $in: uids } },
      {
        projection: {
          _id: 0,
          uid: 1,
          nick: 1,
          level: 1,
        },
      }
    )
    .toArray();

  return users;
}

function getLevelName(level) {
  switch (level) {
    case 10:
      return '免费版';
    case 15:
      return '体验版';
    case 20:
      return '高级版';
    case 30:
      return '尊享版';
    case 40:
      return '旗舰版';
    case 50:
      return '企业版';
    default:
      return level;
  }
}

async function calc(db) {
  const result = await getPromoAct(db);
  console.log('总用户数:', Object.keys(result).length);
  const uids = Object.keys(result)
    .filter((key) => Object.values(result[key]).reduce((a, b) => a + b) > MAX_ACT_SIZE)
    .map((key) => parseInt(key, 10));
  const users = await getUsers(db, uids);
  for (const user of users) {
    if (!user.uid) {
      continue;
    }
    const uid = `${user.uid}`;
    console.log(
      user.nick,
      getLevelName(user.level),
      (result[uid] && result[uid]['promo_mjs']) || 0,
      (result[uid] && result[uid]['mjsv1']) || 0,
      (result[uid] && result[uid]['mjsv2']) || 0
    );
  }
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
