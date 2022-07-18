/** @format */
// @Owner: huangjiandong

import { TEST_DB } from 'astrDataSources';

// const { MongoClient } = require('mongodb');
// const TEST_DB_URL = 'mongodb://localhost:27017/';

const userList = [
  {
    uid: 49150013,
    crm_group_id: '1523975944766078754',
    old_tag_id: 33494809,
    new_tag_id: 81101054,
  },
  {
    uid: 684464910,
    crm_group_id: '1521194344999557315',
    old_tag_id: 39062898,
    new_tag_id: 81027132,
  },
  {
    uid: 1861695009,
    crm_group_id: '1530162176426930292',
    old_tag_id: 35603311,
    new_tag_id: 81113022,
  },
  {
    uid: 620226804,
    crm_group_id: '1521194323423417412',
    old_tag_id: 33480056,
    new_tag_id: 81050103,
  },
  {
    uid: 395101572,
    crm_group_id: '1529980588254271672',
    old_tag_id: 35549986,
    new_tag_id: 81086073,
  },
  {
    uid: 1831198872,
    crm_group_id: '1528884164837592019',
    old_tag_id: 35306803,
    new_tag_id: 81046108,
  },
  {
    uid: 1797370576,
    crm_group_id: '1528774833279668266',
    old_tag_id: 35288843,
    new_tag_id: 81089071,
  },
  {
    uid: 664041931,
    crm_group_id: '1529128245765526273',
    old_tag_id: 35329768,
    new_tag_id: 81083071,
  },
  {
    uid: 505352693,
    crm_group_id: '1521194228823089979',
    old_tag_id: 35506015,
    new_tag_id: 81084084,
  },
  {
    uid: 175021698,
    crm_group_id: '1521212864414848459',
    old_tag_id: 42499007,
    new_tag_id: 81089072,
  },
  {
    uid: 3017612234,
    crm_group_id: '1521195750579775148',
    old_tag_id: 35981392,
    new_tag_id: 81042118,
  },
  {
    uid: 89289635,
    crm_group_id: '1521193876928697183',
    old_tag_id: 35666354,
    new_tag_id: 81094074,
  },
  {
    uid: 2070226626,
    crm_group_id: '1521195168865678381',
    old_tag_id: 35303129,
    new_tag_id: 81068096,
  },
  {
    uid: 3451802680,
    crm_group_id: '1529581002300040120',
    old_tag_id: 35445616,
    new_tag_id: 81043116,
  },
  {
    uid: 2015062895,
    crm_group_id: '1521194979144413519',
    old_tag_id: 34820283,
    new_tag_id: 81108054,
  },
  {
    uid: 583622846,
    crm_group_id: '1523122442823826961',
    old_tag_id: 33060086,
    new_tag_id: 81031114,
  },
  {
    uid: 94522766,
    crm_group_id: '1529063546100787151',
    old_tag_id: 35366184,
    new_tag_id: 81018171,
  },
];

async function getActs(db, uids, crm_group_ids) {
  const data = await db
    .collection('discount_act')
    .find(
      {
        uid: { $in: uids },
        crm_group_id: { $in: crm_group_ids },
        status: { $in: [0, 1, 2, 3] },
      },
      {
        projection: {
          _id: 1,
          uid: 1,
          crm_group_id: 1,
          ump_tag_id: 1,
        },
      }
    )
    .toArray();
  return data;
}

function genKey(item) {
  return `${item.uid}-${item.crm_group_id}`;
}

async function calc(db) {
  const uids = userList.map((item) => item.uid);
  const crm_group_ids = userList.map((item) => item.crm_group_id);
  const actPairs = userList.reduce((acc, item) => {
    acc[genKey(item)] = item;
    return acc;
  }, {});
  const acts = await getActs(db, uids, crm_group_ids);
  for (const act of acts) {
    const res = actPairs[genKey(act)];
    if (res && res.new_tag_id !== act.ump_tag_id) {
      console.log(`用户: ${act.uid} 的活动 ${act._id} 未修改tag_id`);
    }
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
