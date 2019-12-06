// github issue: https://github.com/moment/moment/issues/5267
const moment = require('moment');

const nowStr = "2019-11-27 11:23:00";
const timesStr = {
    "2019-11-27 12:58:00": "2 小时内",
    "2019-11-27 12:53:01": "2 小时内",
    "2019-11-27 12:53:00": "2 小时内",
    "2019-11-27 12:52:59": "2 小时内",
    "2019-11-27 12:52:58": "2 小时内",
    "2019-11-27 12:50:00": "2 小时内",
    "2019-11-27 23:47:00": "1 天内",
    "2019-11-28 23:47:00": "2 天内",
    "2019-11-28 22:01:00": "2 天内",
    "2020-01-15 17:01:00": "2 个月内",
    "2020-01-07 17:01:00": "2 个月内",
    "2023-05-29 17:01:00": "4 年内",
    "2023-05-26 17:01:00": "4 年内",
};

var roundingDefault = moment.relativeTimeRounding();
moment.relativeTimeRounding(Math.ceil); // 时间向上取整
// moment.relativeTimeThreshold('s', 59);  // 超过指定秒后会被认为是一分钟
// moment.relativeTimeThreshold('m', 59); // 超过指定分后会被认为是一小时
// moment.relativeTimeThreshold('h', 23); // 超过指定小时后会被认为是一天
// moment.relativeTimeThreshold('d', 28); // 超过指定天后会被认为是一月
// moment.relativeTimeThreshold('M', 12); // 超过指定月后会被认为是一年

const timeFormat = "YYYY-MM-DD HH:mm:ss";
const nowDate = moment(nowStr, timeFormat);
// const nowUnixDate = moment.unix(moment(nowStr) / 1000);
for (const timeStr in timesStr) {
    const currentDate = moment(timeStr, timeFormat);
    const humanStr = currentDate.locale('zh-cn').from(nowDate);
    // const currentUnixDate = moment.unix(moment(timeStr) / 1000);
    console.log("预期结果: ", timesStr[timeStr], ", 实际结果: ", humanStr);
    // const duration = currentDate.diff(nowDate) / 1000;
    // console.log("duration: ", duration, moment.duration(duration, "seconds").locale('zh-cn').humanize());
}
moment.relativeTimeRounding(roundingDefault); // 恢复默认值

console.log(moment.relativeTimeThreshold('s'));
console.log(moment.relativeTimeThreshold('m'));
console.log(moment.relativeTimeThreshold('h'));
console.log(moment.relativeTimeThreshold('d'));
console.log(moment.relativeTimeThreshold('M'));