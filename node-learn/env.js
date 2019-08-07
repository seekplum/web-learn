const moment = require('moment');

exports.TEST_DB_URL = 'mongodb://localhost:27017/test';

exports.today = moment()
  .startOf('day')
  .subtract(1, 'day');

if (process.env['DAY']) {
  exports.today = moment(process.env['DAY']);
}
