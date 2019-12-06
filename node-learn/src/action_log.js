const { MongoClient } = require('mongodb');
const LOG_DB_URL = 'mongodb://localhost:27017/test';

async function work() {
  const LOG_DB = await MongoClient.connect(LOG_DB_URL, {
    poolSize: 1
  });
  const TEST_DB = LOG_DB;

  // @Owner: huangjiandong

  // import { TEST_DB, LOG_DB } from 'astrDataSources';
  const { ObjectId } = require('mongodb');

  const logDB = LOG_DB;
  const testDB = TEST_DB;
  const mz_aid = ObjectId();
  const uid = 2829330402;

  const actCol = await testDB.collection('act');
  const act = await actCol.findOne({ _id: mz_aid })
  console.log("act: ", act);

  const zkDetailCol = await testDB.collection('detail');
  const zkDetails = await zkDetailCol.find({
    act_id: mz_aid
  }).toArray();
  console.log("zkDetails: ", zkDetails);

  const zkLogDetailCol = await logDB.collection('detail_log');
  const zkLogDetails = await zkLogDetailCol.find({
    act_id: mz_aid
  }).toArray();
  console.log("zkLogDetails: ", zkLogDetails);

  const mjActCol = await testDB.collection('mjs');
  const mjsActs = await mjActCol.find({
    act_id: mz_aid
  }).toArray();
  console.log("mjsActs: ", mjsActs);

  const mjLogActCol = await logDB.collection('mjs_log');
  const mjsLogActs = await mjLogActCol.find({
    act_id: mz_aid
  }).toArray();
  console.log("mjsLogActs: ", mjsLogActs);

  const mjsDetailCol = await testDB.collection('mjs_detail');
  const mjsDetails = await mjsDetailCol.find({
    act_id: mz_aid
  }).toArray();
  console.log("mjsDetails: ", mjsDetails);

  const mjsLogDetailCol = await logDB.collection('mjs_detail_log');
  const mjsLogDetails = await mjsLogDetailCol.find({
    act_id: mz_aid
  }).toArray();
  console.log("mjsLogDetails: ", mjsLogDetails);

  const userActionCol = await logDB.collection('user_action_log');
  const actionLogs = await userActionCol.find({
    uid: uid,
    aid: mz_aid,
  }).toArray();
  console.log("actionLogs: ", actionLogs);

  logDB.close();
}

async function main() {
  await work();
}

if (require.main === module) {
  main().catch(e =>
    setTimeout(() => {
      throw e;
    })
  );
}
