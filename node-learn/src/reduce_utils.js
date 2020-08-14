const oriData = [
  {dataArr: [1]},
  {dataArr: [2]},
  {dataArr: [3]},
];
const dataDict = oriData.reduce((acc, dataItem) => {
  acc[dataItem.dataArr[0]] = dataItem;
  return acc;
}, {});
console.log("dataDict: ", dataDict);

const dataDict2 = {}
for (const item of oriData) {
  dataDict2[item.dataArr[0]] = item;
}
console.log("dataDict2: ", dataDict2)