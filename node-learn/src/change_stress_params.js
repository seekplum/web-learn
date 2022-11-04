/** @format */
// @Owner: huangjiandong
const fetch = require('node-fetch');

const T = '';
const SN = '';
const TB_TOKEN = '';
const TB_COOKIE = '';
const COOKIE = {
  t: T,
  sn: SN,
  _tb_token_: TB_TOKEN,
  cookie2: TB_COOKIE,
};
const Referer = 'https://qa.cloud.tmall.com/miniappstress/?pasResultId=1111&defaultTaskId=1111';

const MZ_HEADER_NAME = 'X-AccessToken';
const MZ_SESSION = '';
const MZ_NICK = '';
const MZ_TOKEN = '';
const MZ_PROMO_AID = '';
const MZ_SHUIYIN_AID = '';
const MZ_WL_FG_AID = '';
const MZ_ITEM_ID = 1111;
const MZ_SKU_ID = 1111;

const MZ_OLD_SHUIYIN_AID = 1111;
const MZ_OLD_ITEM_ID = 1111;
const MZ_OLD_SESSION = '';

function extractCookies(cookieStr) {
  return cookieStr
    .split(';')
    .map((c) => c.split('=').map((v) => v.trim()))
    .filter((v) => v[0].length && v[1].length)
    .reduce((builder, cur) => {
      builder[cur[0]] = cur[1];
      return builder;
    }, {});
}

const cookie = ['t', 'sn', '_tb_token_', 'cookie2'].map((key) => `${key}=${COOKIE[key]}`).join(';');

function genBodyByJson(values) {
  return {
    contentType: 'application/json',
    body: values,
  };
}

function genBodyByForm(values) {
  return {
    contentType: 'application/x-www-form-urlencoded',
    body: values,
  };
}

const Path2Params = {
  '/v1/api/shuiyin/text': {
    params: {
      code: '0015',
      color: '#ffffff',
      size: '28',
      text: 'q',
      double_fonts_drawing: '1',
    },
  },
  '/v1/user/ab_check': {
    params: {
      by_nick: '1',
      group_name: 'version_2021',
    },
  },
  '/v1/user/cb': {
    params: {
      access_token: MZ_TOKEN,
      user_nick: MZ_NICK,
    },
  },
  '/v1/common/search/list': {
    params: {
      iids: `${MZ_ITEM_ID}`,
    },
  },
  '/v1/common/search/tao': {
    params: {
      category: 2,
      q: `${MZ_ITEM_ID}`,
    },
  },
  '/v1/common/kv': {
    params: {
      k: 'stress-test',
    },
  },
  '/v1/common/zk/sku-detail': {
    params: {
      aid: MZ_PROMO_AID,
      iid: MZ_ITEM_ID,
    },
  },
  '/v1/common/zk/item/update': {
    body: genBodyByForm({
      aid: MZ_PROMO_AID,
      settings: JSON.stringify([
        {
          num_iid: MZ_ITEM_ID,
          sku_id: MZ_SKU_ID,
          d_type: 'P',
          d_value: 0,
        },
      ]),
    }),
  },
  '/v1/common/zk/item/remove': {
    params: {
      aid: MZ_PROMO_AID,
      iids: `${MZ_ITEM_ID}`,
    },
  },
  '/v1/common/item/act_skus': {
    params: {
      act_id: MZ_PROMO_AID,
      num_iid: MZ_ITEM_ID,
    },
  },
  '/v1/common/sms/act/by_mz_aid': {
    params: {
      mz_aid: MZ_PROMO_AID,
    },
  },
  '/v1/common/item/skus': {
    params: {
      num_iid: MZ_ITEM_ID,
    },
  },
  '/v1/common/shuiyin2/proxy/api/act/detail': {
    params: { aid: MZ_SHUIYIN_AID },
  },
  '/v1/common/shuiyin2/proxy/api/act/remove_item': {
    params: { aid: MZ_SHUIYIN_AID, itemId: MZ_ITEM_ID },
  },
  '/v1/effect/cb_controlled': {
    params: { ali_ati: '', user_from: 'activity-list' },
  },
  '/v1/common/shuiyin2/proxy/api/act/retry_item': {
    body: genBodyByJson({ aid: MZ_SHUIYIN_AID, itemId: MZ_ITEM_ID, extraInfo: { imageType: 0, position: 0 } }),
  },
  '/v1/common/shuiyin/apply_item': {
    headers: {
      [MZ_HEADER_NAME]: MZ_OLD_SESSION,
    },
    body: genBodyByForm({ id: MZ_OLD_SHUIYIN_AID, iid: MZ_OLD_ITEM_ID }),
  },
  '/v1/common/shuiyin/stop': {
    headers: {
      [MZ_HEADER_NAME]: MZ_OLD_SESSION,
    },
    body: genBodyByForm({ id: MZ_OLD_SHUIYIN_AID }),
  },
  '/v1/common/meizhe-shortlink': {
    params: {
      code: 'meizhe-miniapp-ULTIMATE',
    },
  },
  '/v1/common/shuiyin/proxy/tag/template/by-group': {
    params: {
      group: 167,
    },
  },
  '/wireless/fg/api/miniapp_get_coupon': {
    headers: {
      'always-success': '1',
    },
    params: {
      aid: MZ_WL_FG_AID,
    },
  },
  '/wireless/fg/api/miniapp_get_act_info': {
    params: {
      aid: MZ_WL_FG_AID,
    },
  },
};

function parseParams(task) {
  const taskParams = task.taskParams;
  const paramValue = JSON.parse(task.paramValue);
  const requestPath = task.requestPath;

  let { headers = {}, params = {}, body = {} } = Path2Params[requestPath] || {};

  if (
    requestPath.startsWith('/v1/') &&
    (Object.keys(headers).length === 0 || (Object.keys(headers).length > 0 && !headers.MZ_HEADER_NAME))
  ) {
    headers = { ...headers, [MZ_HEADER_NAME]: MZ_SESSION };
  } else if (requestPath.startsWith('/mgn/batched/')) {
    body = [
      {
        r: 0.27981724144832265,
        c: 'session_set sdkVersion=1.24.13 platform=pc system=6.2.1083.9200 brand=windows appName=qianniu appVersion=7.37.07N',
        s: '1626169830794_1_0',
        t: 1631264829585.093,
      },
    ];
    task.requestType = 'POST';
  } else if (requestPath.startsWith('/mgn/')) {
    params = { ...params, r: 0.27981724144832265, c: 'connect', t: 1631264829585.093 };
  }

  taskParams.headers = {
    ...taskParams.headers,
    ...headers,
  };
  paramValue.headers = { ...paramValue.headers, ...headers };

  taskParams.params = {
    ...taskParams.params,
    ...params,
  };
  paramValue.params = { ...paramValue.params, ...params };

  if (Array.isArray(body) || Array.isArray(taskParams.body) || Array.isArray(paramValue.body)) {
    taskParams.body = body;
    paramValue.body = body;
  } else {
    taskParams.body = { ...taskParams.body, ...body };
    paramValue.body = { ...paramValue.body, ...body };
  }

  if (
    [
      '/v1/common/shuiyin2/proxy-tmpl/api/shuiyin/template/basic/get',
      '/v1/common/shuiyin2/proxy-tmpl/api/shuiyin/template/groups/get',
      '/v1/common/shuiyin2/proxy/api/act/retry_item',
      '/v1/common/shuiyin/apply_item',
      '/v1/effect/cb_controlled',
      '/v1/common/shuiyin/stop',
      '/v1/common/shuiyin2/migrate',
      '/v1/common/zk/item/update',
      '/v1/common/zk/item/remove',
      '/wireless/fg/api/miniapp_get_coupon',
    ].includes(requestPath)
  ) {
    task.requestType = 'POST';
  }
  return [taskParams, paramValue];
}
async function updateTasks(id, task) {
  const [taskParams, paramValue] = parseParams(task);
  const newTask = {
    functionName: '',
    cloudAppName: task.cloudAppName,
    handlerName: '',
    appName: task.appName,
    appkey: '',
    id: task.id,
    taskParams: taskParams,
    taskName: task.taskName,
    taskDesc: task.taskDesc,
    miniapp: task.miniapp,
    requestPath: task.requestPath,
    cloudApp: task.cloudApp,
    requestType: task.requestType || 'GET',
    dataType: task.dataType,
    useDynamicParam: task.useDynamicParam,
    needVerify: task.needVerify,
    mvel: task.mvel,
    sgSeqModel: 'step',
    tps: task.tps,
    duration: task.duration,
    timeout: 10000,
    dynamicFile: '',
    oldFieldId: task.oldFieldId,
    gmtModified: task.gmtModified,
    fileName: task.fileName,
    paramType: task.paramType,
    pasTaskId: task.pasTaskId,
    scenParams: task.scenParams,
    passStandard: task.passStandard,
    paramValue: JSON.stringify(paramValue),
    isDelete: task.isDelete,
    newFieldId: task.newFieldId,
    pasScenarioId: task.pasScenarioId,
    gmtCreate: task.gmtCreate,
    scenType: task.scenType,
    deleteReason: task.deleteReason,
    fileSize: task.fileSize,
  };
  const response = await fetch('https://qa.cloud.tmall.com/miniappstress/createTaskOnlyNew', {
    headers: {
      cookie,
      'content-type': 'application/x-www-form-urlencoded',
      Referer,
    },
    body: `id=${id}&task=${encodeURIComponent(JSON.stringify(newTask))}`,
    method: 'POST',
    mode: 'cors',
  });
  const data = await response.json();
  return data;
}

async function getTasks(taskId) {
  const response = await fetch(`https://qa.cloud.tmall.com/miniappstress/getScenarioInformation?id=${taskId}`, {
    headers: {
      cookie,
    },
    method: 'GET',
    mode: 'cors',
  });
  const data = await response.json();
  const tasks = data.content.tasks.data;
  return tasks;
}

async function testTask(subTaskId) {
  const response = await fetch(`https://qa.cloud.tmall.com/miniappstress/serviceTest?localTaskId=${subTaskId}`, {
    headers: {
      cookie,
      Referer,
    },
    body: null,
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

async function work() {
  const taskId = 1111;
  const tasks = await getTasks(taskId);
  console.log('tasks count:', tasks.length);
  for (const task of tasks) {
    if (
      !task.requestPath.startsWith('/v1') &&
      !task.requestPath.startsWith('/mgn') &&
      !task.requestPath.startsWith('/wireless')
    ) {
      console.log(task.taskName, task.requestPath);
      continue;
    }

    // if (task.taskName !== "task27") {
    //   continue;
    // }

    // 配置任务参数
    // const ret = await updateTasks(taskId, task);
    // if (!ret.success) {
    //   console.log('[updateTasks]', ret);
    //   break;
    // }
    // 单个任务调试
    const res = await testTask(task.id);
    if (
      (task.requestPath.startsWith('/v1') && !(res.success && res.data && res.data.success)) ||
      (task.requestPath.startsWith('/mgn') && !res.success) ||
      (task.requestPath.startsWith('/wireless') && !res.success)
    ) {
      console.log('[testTask]', task.taskName, task.id, task.requestPath, JSON.stringify(res));
    }
  }
}

async function main() {
  await work();
}

if (require.main === module) {
  main().catch((e) =>
    setTimeout(() => {
      throw e;
    })
  );
}
