// @Owner: huangjiandong

// 统计某天的活跃用户数量

// import { MEIZHE_DB, SHUIYIN_DB, MSHOW_DB, MSHOW_OUT } from 'astrDataSources';

// const meizheDB = MEIZHE_DB;
// const shuiyinDB = SHUIYIN_DB;
// const mshowDB = MSHOW_DB;
// const mshowStatDB = MSHOW_OUT;

const moment = require('moment');

const targetStr = '2020-01-08 00:00:00';
const targetDay = moment(targetStr).add(8, "hours");
const targetDate = targetDay.toDate();
const targetEndDay = targetDay.add(1, 'days');
const targetEndDate = targetEndDay.toDate();

// 活动页 byPage 表的时间不是本地时间，是UTC时间，不要加 8 小时
const pageDay = moment(targetStr);
const pageDate = pageDay.toDate();
const pageEndDay = pageDay.add(1, 'days');
const pageEndDate = pageEndDay.toDate();

console.log("targetDay:", targetDate, "targetEndDay: ", targetEndDate);

async function _getSubActivity(db, act_type) {
    // db.discount_act.aggregate([{"$match": {act_type: "zhekou"}},{$project: {uid: 1}}, {$group: {_id: "$uid"}}, {$group: {_id: null, count: {$sum: 1}}}])
    // stopped 有索引
    const data = await db.collection('discount_act').aggregate([
        {
            $match: {
                created: { "$lt": targetEndDate },
                "$or": [
                    {
                        stopped: { "$gte": targetDate }
                    },
                    {
                        stopped: null,
                        status: { "$in": [1, 0, 2, 3] }, // appling, created, running, stoppping
                    }
                ],
                act_type: act_type,
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
    const activityTypesMap = {
        "zhekou": "普通折扣",
        "fzhekou": "全店打折",
        // "dzhekou": "全店折扣排除部分",
        "skuzhekou": "SKU打折",
        "mjs": "满减",
        "fmjs": "全店满减",
        // "dmjs": "全店满减排除部分",
        "circlezhekou": "循环打折1.0",
        "secondzhekou": "第二件促销",
        "circlezhekouv2": "循环打折2.0",
    };
    for (let act_type in activityTypesMap) {
        const type_name = activityTypesMap[act_type];
        const user_count = await _getSubActivity(db, act_type);
        console.log("打折/满减 活动类型:", type_name, "用户数量: ", user_count);
    }
}

async function _getSubWatemark(db, type) {
    // db.shuiyin_group.aggregate([{"$match":{type:"normal","$or":[{end:null},{end:{"$gt":ISODate("2020-01-01T16:59:27.738Z")}}]},},{$project:{uid:1}},{$group:{_id:"$uid"}},{$group:{_id:null,count:{$sum:1}}}])
    let matchType = type;
    if (type === "normal") {
        matchType = { "$in": [type, null] }
    }
    // type, created 有索引
    const data = await db.collection('shuiyin_group').aggregate([
        {
            "$match": {
                created: { "$lt": targetEndDate },
                type: matchType,
                "$or": [
                    {
                        removed: null, // 不定时结束的水印都是在生效中
                        status: { "$in": [1, 2, 3, 5] }, // 1: 设置中 2: 进行中 3: 结束中 5: 修改中
                    },
                    {
                        removed: { "$gte": targetDate } // 定时结束水印
                    }
                ],
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
    const markTypesMap = {
        "normal": "主图水印",
        "vertical": "长图水印",
        "rectangle": "3:4主图水印",
        // "wireless": "无线主图",
    };
    for (let type in markTypesMap) {
        const type_name = markTypesMap[type];
        const user_count = await _getSubWatemark(db, type);
        console.log("水印 类型:", type_name, "用户数量: ", user_count);
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
    console.log("权益营销 优惠券 用户数量:", count);
}
/**
 * 获取活动页用户数量
 */
async function getActivePage(db, statDB) {
    // db.byPage.aggregate([{"$match": {date: {"$gte": ISODate("2020-01-08T15:04:23.896Z"), "$lt": ISODate("2020-01-13T15:04:23.896Z")}}},{$project: {uid: 1}}, {$group: {_id: "$uid"}}, {$group: {_id: null, count: {$sum: 1}}}])
    // date 有索引
    const pageData = await statDB.collection('byPage').aggregate([
        {
            "$match": {
                date: { "$gte": pageDate, "$lt": pageEndDate },
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
    console.log("活动页 用户数量:", count);
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
    const mshowDB = logDB;
    const mshowStatDB = logDB;

    await getDiscount(meizheDB);
    await getWatermark(shuiyinDB);
    await getCoupon(meizheDB);
    await getActivePage(mshowDB, mshowStatDB);

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
