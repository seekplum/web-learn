/**
 *
 * @format
 * 下载阿里云日志
 *
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function nextClick() {
  const nextButton = document.getElementsByClassName(
    'next-btn next-medium next-btn-normal next-pagination-item next-next'
  )[0];
  if (nextButton) nextButton.click();
  return nextButton ? !nextButton.disabled : false;
}

function downloadClick() {
  const downloadButton = Array.from(document.getElementsByClassName('sls-icon')).filter(
    (elem) => elem.className.baseVal.indexOf('sls-icon style__down-svg__') !== -1
  )[0];
  if (downloadButton) {
    // 模拟鼠标点击
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    downloadButton.dispatchEvent(clickEvent);
    // downloadButton.click();
  }
  return !!downloadButton;
}

function confirmClick() {
  const confirmButton = document.getElementsByClassName('next-btn next-medium next-btn-primary next-dialog-btn')[0];
  if (confirmButton) confirmButton.click();
  return !!confirmButton;
}

function cancelClick() {
  const cancelButtons = document.getElementsByClassName('next-btn next-medium next-btn-normal next-dialog-btn');
  const cancelButton = cancelButtons[cancelButtons.length - 1];
  if (cancelButton) cancelButton.click();
  return !!cancelButton;
}

function getCurrentPage() {
  const page = document.getElementsByClassName(
    'next-btn next-medium next-btn-normal next-pagination-item next-current'
  )[0].textContent;
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
      console.log('page:', page, 'currentPage: ', currentPage, 'retry:', retry);
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
        console.log('download click: ', i + 1);
        await sleep(1000);
      }
    }
    if (!success) {
      break;
    }

    await sleep(1000);
    // 点击确认下载
    success = false;
    for (let j = 0; j < 10; j++) {
      if (confirmClick()) {
        success = true;
        break;
      } else {
        console.log('confirm click: ', j + 1);
        await sleep(500);
      }
    }
    if (!success) {
      break;
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
    console.log('count: ', count, 'currentPage:', currentPage);
  }
  console.log('download finish: ', count);
}

main();
