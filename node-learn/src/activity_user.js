// @Owner: huangjiandong

// 统计某天的活跃用户数量

// import { MEIZHE_DB, SHUIYIN_DB, MSHOW_OUT } from 'astrDataSources';

// const meizheDB = MEIZHE_DB;
// const shuiyinDB = SHUIYIN_DB;
// const mshowStatDB = MSHOW_OUT;

const moment = require('moment');

const targetStr = '2020-01-08 00:00:00';
const targetDay = moment(targetStr).add(8, "hours");
const targetDate = targetDay.toDate();
const targetEndDay = targetDay.add(1, 'days');
const targetEndDate = targetEndDay.toDate();

console.log("targetDay:", targetDate, targetDay.format('YYYY-MM-DD HH:mm:ss'), "targetEndDay: ", targetEndDate, targetEndDay.format('YYYY-MM-DD HH:mm:ss'));

async function _getSubActivity(db, act_type) {
    // db.discount_act.aggregate([{"$match": {act_type: "zhekou"}},{$project: {uid: 1}}, {$group: {_id: "$uid"}}, {$group: {_id: null, count: {$sum: 1}}}])
    // ended 有索引
    const data = await db.collection('discount_act').aggregate([
        {
            $match: {
                ended: { "$gte": targetDate },
                act_type: act_type,
                status: { "$in": [1, 0, 2, 3] }, // appling, created, running, stoppping
            }
        },
        { $project: { uid: 1 } },
        { $group: { _id: { uid: "$uid" } } },
        { $group: { _id: null, count: { $sum: 1 } } }
    ]).toArray();
    const count = data.length > 0 ? data[0].count : 0;
    return count;
}

/**
 * 获取打折满减活动用户数量
 */
async function getDiscount(db) {
    const activityTypes = ["zhekou", "fzhekou", "dzhekou", "skuzhekou", "mjs", "fmjs", "dmjs", "circlezhekou", "secondzhekou", "circlezhekouv2"];
    for (let idx = 0; idx < activityTypes.length; idx++) {
        const act_type = activityTypes[idx];
        const user_count = await _getSubActivity(db, act_type);
        console.log("打折/满减 活动类型:", act_type, "user number: ", user_count);
    }
}

async function _getSubWatemark(db, type) {
    // db.shuiyin_group.aggregate([{"$match":{type:"normal","$or":[{end:null},{end:{"$gt":ISODate("2020-01-01T16:59:27.738Z")}}]},},{$project:{uid:1}},{$group:{_id:"$uid"}},{$group:{_id:null,count:{$sum:1}}}])
    let matchType = type;
    if (type === "normal") {
        matchType = { "$in": [type, null] }
    }
    // type, created, ended 有索引
    const data = await db.collection('shuiyin_group').aggregate([
        {
            "$match": {
                created: { "$lte": targetDate },
                type: matchType,
                "$or": [
                    {
                        ended: null // 不定时结束的水印都是在生效中
                    },
                    {
                        ended: { "$gt": targetEndDate } // 定时结束水印
                    }
                ],
                status: { "$in": [1, 2, 5] }, // 1: 设置中 2: 进行中 5: 修改中
            }
        },
        { $project: { uid: 1 } },
        { $group: { _id: "$uid" } },
        { $group: { _id: null, count: { $sum: 1 } } }
    ]).toArray();
    const count = data.length > 0 ? data[0].count : 0;
    return count;
}
/**
 * 获取水印用户数量
 */
async function getWatermark(db) {
    const markTypes = ["normal", "vertical", "rectangle", "wireless"];
    for (let idx = 0; idx < markTypes.length; idx++) {
        const type = markTypes[idx];
        const user_count = await _getSubWatemark(db, type);
        console.log("水印 类型:", type, "user number: ", user_count);
    }

}
/**
 * 获取优惠券用户数量
 */
async function getCoupon(db) {
    // db.sent_log.aggregate([{"$match": {sent_t: {"$gte": ISODate("2020-01-12T15:04:23.896Z"), "$lt": ISODate("2020-01-13T15:04:23.896Z")}}},{$project: {uid: 1}}, {$group: {_id: "$uid"}}, {$group: {_id: null, count: {$sum: 1}}}])

    // sent_t 有索引
    const data = await db.collection('sent_log').aggregate([
        {
            "$match": { sent_t: { "$gte": targetDate, "$lt": targetEndDate } }
        },
        { $project: { uid: 1 } },
        { $group: { _id: "$uid" } },
        { $group: { _id: null, count: { $sum: 1 } } }
    ]).toArray();
    const count = data.length > 0 ? data[0].count : 0;
    // return count;
    console.log("权益营销 优惠券 user number:", count);
}
/**
 * 获取活动页用户数量
 */
async function getActivePage(db) {
    // db.byPage.aggregate([{"$match": {date: {"$gte": ISODate("2020-01-08T15:04:23.896Z"), "$lt": ISODate("2020-01-13T15:04:23.896Z")}}},{$project: {uid: 1}}, {$group: {_id: "$uid"}}, {$group: {_id: null, count: {$sum: 1}}}])

    // date 有索引
    const pageData = await db.collection('byPage').aggregate([
        {
            "$match": {
                date: { "$gte": targetDate, "$lt": targetEndDate },
                pageView: { "$gte": 1 }
            }
        },
        { $project: { pageId: 1 } },
        { $group: { _id: "$pageId" } },
    ]).toArray();

    const pageIds = pageData.map(v => {
        return parseInt(v["_id"], 10)
    });
    // _id 有索引
    const data = await db.collection('mshow_page').aggregate([
        {
            "$match": { _id: { "$in": pageIds } }
        },
        { $project: { uid: 1 } },
        { $group: { _id: "$uid" } },
        { $group: { _id: null, count: { $sum: 1 } } }
    ]).toArray();
    const count = data.length > 0 ? data[0].count : 0;
    // return count;
    console.log("活动页 user number:", count);
}


async function work() {
    const { MongoClient } = require('mongodb');
    const LOG_DB_URL = 'mongodb://localhost:27017/meizhedb';
    const LOG_DB = await MongoClient.connect(LOG_DB_URL, {
        poolSize: 1
    });
    const logDB = LOG_DB;
    const meizheDB = logDB;
    const shuiyinDB = logDB;
    const mshowStatDB = logDB;

    await getDiscount(meizheDB);
    await getWatermark(shuiyinDB);
    await getCoupon(meizheDB);
    await getActivePage(mshowStatDB);

    logDB.close();
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
