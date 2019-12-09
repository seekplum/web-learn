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
    const uid = 1902492421;

    const actCol = await testDB.collection('discount_act');
    const acts = await actCol.find({ uid: uid }).toArray();
    // console.log("acts: ", acts);

    const userActionCol = await logDB.collection('user_action_log');
    const actionLogs = await userActionCol.find({
        uid: uid,
    }).toArray();
    // console.log("actionLogs: ", actionLogs);
    let actionLogsObject = {};
    actionLogs.forEach((item, idx) => {
        const aid = item.aid;
        if (actionLogsObject[aid]) {
            actionLogsObject[aid].push(item);
        } else {
            actionLogsObject[aid] = [item];
        }
    });

    acts.forEach((act, idx) => {
        const logs = actionLogsObject[act._id];
        console.log("act: ", act, "action logs: ", logs);
    })

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
