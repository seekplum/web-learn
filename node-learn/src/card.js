// @Owner: huangjiandong

// 查询优惠券权益卡详情

// import { XXX_COUPON_DB } from 'astrDataSources';

// const crmDB = XXX_COUPON_DB;


const { ObjectId } = require('mongodb');
// const uid = 0;
// const card_id =  ObjectId();
// const card_task_id =  ObjectId();
// const coupon_ids = [1, 2];

/**
 * 获取优惠卡信息
 */
async function getCouponCard(db) {
    const data = await db.collection('coupon_card_act').findOne({ _id: card_id });
    console.log("coupon card act:", data);
}

/**
 * 获取优惠卡发送任务
 */
async function getCardTask(db) {
    const data = await db.collection('coupon_card_task').find({ coupon_card_act_id: card_id }).toArray();;
    console.log("coupon card task:", data);
}
/**
 * 获取优惠卡未发送记录
 */
async function getCardTaskUnSent(db) {
    const sent_logs = await db.collection('coupon_card_sent_log').find({
        uid: uid,
        coupon_card_act_id: card_id,
        coupon_card_task_id: card_task_id,
        active: 1,
        coupon_number: null
    }).toArray();
    let tmp_ids = [];
    for (let sent of sent_logs) {
        let buyer_nick = sent.buyer_nick;
        for (let cid of coupon_ids) {
            const log = await db.collection('coupon_card_sent_log').findOne({
                uid: uid,
                coupon_card_act_id: card_id,
                coupon_card_task_id: card_task_id,
                buyer_nick: buyer_nick,
                cid: cid
            })
            if (!log && !tmp_ids.includes(buyer_nick + cid)) {
                console.log("_id:", sent._id, "buyer_nick:", buyer_nick, "cid:", cid);
                tmp_ids.push(buyer_nick + cid);
                break
            }
        }
    }
}

/**
 * 获取优惠卡发送记录
 */
async function getCardTaskSent(db) {
    const sent_logs = await db.collection('coupon_card_sent_log').find({
        uid: uid,
        coupon_card_act_id: card_id,
        coupon_card_task_id: card_task_id,
        active: 1,
    }).toArray();
    for (let sent of sent_logs) {
        console.log("buyer_nick:", sent.buyer_nick, "cid:", sent.cid, "coupon_number:", sent.coupon_number);
    }
}


async function work() {
    const TEST_DB_URL = 'mongodb://localhost:27017/test';
    const { MongoClient } = require('mongodb');
    const TEST_DB = await MongoClient.connect(TEST_DB_URL, {
        poolSize: 1
    });
    const crmDB = TEST_DB;

    // await getCouponCard(crmDB);
    // await getCardTask(crmDB);
    await getCardTaskSent(crmDB);

    TEST_DB.close();
}

// await work();

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
