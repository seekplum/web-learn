/**
 * 
 * 下载阿里云日志
 * 
*/
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function nextClick() {
  const next_button = document.getElementsByClassName("next-btn next-btn-normal next-btn-medium next-pagination-item next")[0];
  if (next_button) next_button.click();
  return next_button ? !next_button.disabled : false;
}

function downloadClick() {
  const download_button = document.getElementsByClassName("next-btn next-btn-normal next-btn-small outcsv")[0];
  if (download_button) download_button.click();
  return !!download_button;
}

function confirmClick() {
  const confirm_button = document.getElementsByClassName("next-btn next-btn-primary next-btn-medium")[0];
  if (confirm_button) confirm_button.click();
  return !!confirm_button;
}

function cancelClick(){
  const cancel_buttons = document.getElementsByClassName("next-btn next-btn-normal next-btn-medium");
  const cancel_button = cancel_buttons[cancel_buttons.length - 1];
  if (cancel_button) cancel_button.click();
  return !!cancel_button;
}

function getCurrentPage() {
  const page = document.getElementsByClassName("next-btn next-btn-normal next-btn-medium next-pagination-item current")[0].textContent;
  return parseInt(page, 10);
}

async function main() {
  let next = true;
  let count = 0;
  let page = 1;
  let currentPage = getCurrentPage();
  while (next && currentPage <= page) {

    // 点击下一页
    let retry = 5;
    let success = false;
    while (currentPage < page && retry > 0) {
      next = nextClick();
      currentPage = getCurrentPage();
      console.log("page:", page, "currentPage: ", currentPage, "retry:", retry);
      retry = retry - 1;
      await sleep(1000);
    }

    await sleep(1000);
    // 点击下载
    for (let i = 0; i < 10; i++) {
      if (downloadClick()) {
        success = true;
        break;
      } else {
        console.log("download click: ", i + 1);
        await sleep(1000);
      }
    }
    if (!success) {
      break
    }

    await sleep(1000);
    // 点击确认下载
    success = false;
    for (let j = 0; j < 10; j++) {
      if (confirmClick()) {
        success = true;
        break;
      } else {
        console.log("confirm click: ", j + 1);
        await sleep(500);
      }
    }
    if (!success) {
      break
    }
    // await sleep(1000);
    // success = false;
    // for (let k = 0; k < 10; k++) {
    //   if (cancelClick()) {
    //     success = true;
    //     break;
    //   } else {
    //     console.log("cancel click: ", k + 1);
    //     await sleep(500);
    //   }
    // }
    // if (!success) {
    //   break
    // }
    count += 1;
    page = page + 1;
    console.log("count: ", count, "currentPage:", currentPage);
  }
  console.log("donwload finish: ", count);
}

main();
