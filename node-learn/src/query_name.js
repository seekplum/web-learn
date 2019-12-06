const { MongoClient } = require('mongodb');
const { TEST_DB_URL } = require('./env');

async function work() {
    const testDB = await MongoClient.connect(TEST_DB_URL, {
        poolSize: 1
    });

    const refundCol = testDB.collection('refund_order');

    // 历史所有的版本名字
    const names = await refundCol.distinct("article_item_name");
    console.log("names:", names);

    // 历史所有版本名字和标识码
    const names_code = await refundCol.aggregate([
        {
            $group: { "_id": { article_item_name: "$article_item_name", article_code: "$article_code" } }
        }
    ]).toArray();

    for (let item of names_code) {
        console.log("name code: ", JSON.stringify(item));
    }

    // 退款总数
    const total = await refundCol.count();
    console.log("total: ", total);

    // 未退款数量
    const not_refund_total = await refundCol.find({ is_refunded: 0 }).count();
    console.log("not_refund_total: ", not_refund_total);

    // 切记手动关闭DB，否则会导致程序不退出
    testDB.close();
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

