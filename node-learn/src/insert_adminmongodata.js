/** @format */

/**
 *
 * 通过 AdminMongo 写入数据
 *
 */
const Axios = require('axios');
const requests = Axios.create();
const url = 'http://adminmongo.dev.meideng.net/document/mongo/meizhedb/function_used/insert_doc';
const headers = {
  Host: 'adminmongo.dev.meideng.net',
};
const data = {
  objectData: JSON.stringify({ uid: 987654321 }),
};
const proxy = {
  host: 'test4.goodtp.com',
  port: 8720,
  auth: {
    username: 'mztest',
    password: 'mzceshi',
  },
};
requests
  .request({
    url: url,
    method: 'post',
    headers: headers,
    data: data,
    proxy: proxy,
  })
  .then((response) => {
    console.log('respone:', response.data);
  });
