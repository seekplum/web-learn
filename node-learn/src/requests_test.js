/** @format */

const Axios = require('axios');
const requests = Axios.create();

const url = 'http://httpbin.org/post';
const headers = { 'Content-Type': 'application/json', testRequest: 'testRequestHeaders' };
const data = {
  testRequest: 'testRequestData',
};
console.log('url: ', url, 'data:', data);
requests
  .post(url, data, {
    headers: headers,
    // https://github.com/axios/axios/issues/430
    // transformResponse: requests.defaults.transformResponse.concat((data) => {
    //   console.log('transformResponse', data);
    //   return data.json;
    // }),
    // https://github.com/axios/axios/blob/b4c5d35d2875191dfa8c3919d4227dce8e2ad23f/lib/defaults.js#L58-L66
    transformResponse: [
      function transformResponse(data) {
        /*eslint no-param-reassign:0*/
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (e) {
            /* Ignore */
          }
        }
        console.log('transformResponse', data);
        return data.json;
      },
    ],
  })
  .then((response) => {
    console.log('respone data:', response.data);
  });
