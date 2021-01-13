/** @format */

/**
 *
 * 通过 AdminMongo 写入数据
 *
 */
const headers = {
  Host: 'adminmongo.dev.xxx.net',
};
const proxy = {
  host: 'test.xxx.com',
  port: 8700,
  auth: {
    username: 'username-xxx',
    password: 'password-xxx',
  },
};
const Axios = require('axios');
const requests = Axios.create();

async function getUsers() {
  let page = 0;
  const pageSize = 5;
  let totalPage = 1;
  const nicks = [];
  const data = {
    query: {},
    docsPerPage: pageSize,
  };
  while (page < totalPage) {
    page += 1;
    const url = `http://adminmongo.dev.meideng.net/api/mongo/xxxdb/user/${page}`;
    const response = await requests.request({
      url: url,
      method: 'post',
      headers: headers,
      proxy: proxy,
      data: data,
    });

    const res = response.data;
    totalPage = Math.ceil(res.total_docs / pageSize);
    for (const user of res.data) {
      nicks.push(user['nick']);
    }
  }
  return nicks;
}

async function insertUsers(nicks) {
  const url = 'http://adminmongo.dev.meideng.net/document/xxxdb_survey/xxxdb_survey/survey/insert_doc';

  for (const nick of nicks) {
    const data = {
      objectData: JSON.stringify({ _id: nick }),
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
        console.log('response:', response.code);
      })
      .catch((err) => {
        console.log('error:', err.response.status, err.response.statusText);
      });
  }
}

async function main() {
  const nicks = await getUsers();
  insertUsers(nicks);
}

main();
