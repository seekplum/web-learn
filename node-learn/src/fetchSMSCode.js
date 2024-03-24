const axios = require('axios');

const FEISHU_URL = "https://open.feishu.cn/open-apis/bot/v2/hook/";
const FEISHU_TOKEN = "";


function parseMessage(notification) {
    return notification.getText() || notification.tickerText;
}

function feishuNotify(msg) {
    log(msg);
    const body = { msg_type: "text", content: { "text": msg } };
    axios.post(`${FEISHU_URL}${FEISHU_TOKEN}`, body).then(function (res) {
        log('发送飞书消息成功.');
    }).catch(function (err) {
        log('发送飞书消息失败!!!');
        console.error(err);
    });
}


function printNotification(notification) {
    const msg = "应用包名: " + notification.getPackageName() + "\n" +
        "通知文本: " + notification.getText() + "\n" +
        "通知优先级: " + notification.priority + "\n" +
        "通知目录: " + notification.category + "\n" +
        "通知时间: " + new Date(notification.when) + "\n" +
        "通知数: " + notification.number + "\n" +
        "通知摘要: " + notification.tickerText;
    log(msg)
}

function smsEvents() {
    const SMSCodeRegex = /.*验证码[\s:：是]*(\d{4,6}).*/;

    log("启动事件监听: ", new Date().toISOString());
    events.observeNotification();
    events.onNotification(function (n) {
        log("通知时间为: ", new Date(n.when).toISOString());
        printNotification(n);
        if (n.category != "msg") {
            return;
        }
        const message = parseMessage(n);
        if (!message) {
            return;
        }
        if (!(message.includes('验证码') && ["知乎", "百度", "抖店", "抖音"].some(x => !!message.includes(x)))) {
            log(`非需要的验证码消息，消息内容：${message}`);
            return;
        }

        const match = SMSCodeRegex.exec(message);
        if (!match) {
            log(`无法匹配验证码，消息内容：${message}`);
            return;
        }

        const code = match[1];
        feishuNotify(`验证码: ${code}, 原始消息: ${message}`);
    });
}

function keyEvents() {
    log("启用按键监听: ", new Date().toISOString());
    events.observeKey();
    events.onKeyDown("volume_up", function (event) {
        feishuNotify("音量+键被按下了");
    });
    events.onKeyDown("volume_down", function (event) {
        feishuNotify("音量-键被按下了");
    });
}

const startMsg = "脚本启动: " + new Date().toISOString();
log(startMsg);
toast(startMsg);
smsEvents();
keyEvents();
