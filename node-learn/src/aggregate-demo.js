/**
 * 安装包
 * 
 * npm install mongodb
 * 
 * 插入测试数据
 * 
 * db.customers.insert({name: 1, age: 1, test: {"a": "a"}});
 * db.customers.insert({name: 2, age: 2, test: {"b": "b"}});
 * 
 * 运行
 * 
 * node aggregate-demo.js
 * 
 */

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    var dbo = db.db("mydb");
    if (err) throw err;
    dbo.collection("customers").aggregate([
        {
            $group: { "_id": { name: "$name", age: "$age" } }
        }
    ]).toArray(function (err, result) {
        if (err) throw err;
        for (let item of result) {
            console.log("name age: ", JSON.stringify(item));
        }
        db.close();
    });
});