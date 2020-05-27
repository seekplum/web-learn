/** @format */

import React from "react";

import echarts from "echarts/lib/echarts"; // 引入 ECharts 主模块
import "./map-china.js"; // 引入地图

import styles from "./EChartsPage.module.scss"; // 扩展名需要更改为：[name].module.scss 或 [name].module.sass

function randomData(max, min) {
  max = max || 10;
  min = min || 0;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
const CHART_OPTION_MAP = {
  socks: {
    key: "socks",
    name: "袜子",
    order: 0,
    link: "#a",
  },
  shirt: {
    key: "shirt",
    name: "衬衫",
    order: 1,
    link: "#b",
  },
  sweater: {
    key: "sweater",
    name: "毛衣",
    order: 2,
    link: "#c",
  },
  georgette: {
    key: "georgette",
    name: "雪纺衫",
    order: 3,
    link: "#d",
  },
  trousers: {
    key: "trousers",
    name: "裤子",
    order: 4,
    link: "#e",
  },
  heels: {
    key: "heels",
    name: "高跟鞋",
    order: 5,
    link: "#f",
  },
};
function getDemoChartOption(title) {
  title = title || "ECharts 入门示例";
  const showData = Object.keys(CHART_OPTION_MAP).map((key) => {
    return CHART_OPTION_MAP[key];
  });
  showData.sort((a, b) => a.order - b.order);
  const yAxisMax = 20;
  const yAxisInterval = yAxisMax / 4;
  const xAxisData = Object.keys(showData).map((key) => showData[key].name);
  const seriesData = Array.from({ length: xAxisData.length }, (v, idx) =>
    randomData(yAxisMax)
  );

  return {
    title: {
      text: title,
      x: "center", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
      y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
    },
    grid: {
      left: "10%",
      top: 40,
      right: 14,
      bottom: 50,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
      formatter: (params) => {
        const { seriesName, name, value } = params[0];
        return `<div style="padding: 8px;text-align: left;"><span style="font-size: 14px;">${name}</span><br /><span style="font-size: 12px;">${seriesName}：${value}</span></div>`;
      },
      backgroundColor: "#FFFFFF",
      textStyle: {
        color: "#666666",
      },
      extraCssText:
        "box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);border-radius: 4px;",
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: "#D8D8D8",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        rotate: 0, // 文字旋转角度
      },
      data: xAxisData,
    },
    yAxis: {
      name: "销售数据",
      interval: yAxisInterval,
      min: 0,
      max: yAxisMax,
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "销量",
        type: "bar",
        itemStyle: {
          color: "#74AEFF",
        },
        data: seriesData,
      },
    ],
    textStyle: {
      color: "#999999",
    },
  };
}

function DemoChartPage() {
  const echartsRef = React.useRef();
  const [echart, setEchart] = React.useState(null);

  React.useEffect(() => {
    if (echartsRef) {
      // 基于准备好的dom，初始化echarts实例
      const echart = echarts.init(echartsRef.current);
      setEchart(echart);
    }
  }, [echartsRef]);
  React.useEffect(() => {
    if (echart) {
      // 绘制图表
      const option = getDemoChartOption();
      echart.setOption(option);

      // 点击事件监听
      const zr = echart.getZr();
      zr.on("click", function (params) {
        const pointInPixel = [params.offsetX, params.offsetY];
        if (echart.containPixel("grid", pointInPixel)) {
          let index = echart.convertFromPixel({ seriesIndex: 0 }, [
            params.offsetX,
            params.offsetY,
          ])[0];
          index = Math.abs(index);
          console.log("echart click: ", index);
        }
      });
    }
  }, [echart]);
  return (
    <div
      ref={echartsRef}
      className={`${styles.echartsContainer} ${styles.demoChart}`}
    ></div>
  );
}
const REGION_CODE = {
  11: "北京",
  12: "天津",
  13: "河北",
  14: "山西",
  15: "内蒙古",
  21: "辽宁",
  22: "吉林",
  23: "黑龙江",
  31: "上海",
  32: "江苏",
  33: "浙江",
  34: "安徽",
  35: "福建",
  36: "江西",
  37: "山东",
  41: "河南",
  42: "湖北",
  43: "湖南",
  44: "广东",
  45: "广西",
  46: "海南",
  50: "重庆",
  51: "四川",
  52: "贵州",
  53: "云南",
  54: "西藏",
  61: "陕西",
  62: "甘肃",
  63: "青海",
  64: "宁夏",
  65: "新疆",
  71: "台湾",
  81: "香港",
  82: "澳门",

  99: "南海诸岛",
};
function getRegionChartOption(title) {
  title = title || "销量";
  const maxValue = 15;
  const finalData = [];
  for (const code of Object.keys(REGION_CODE)) {
    finalData.push({
      name: REGION_CODE[code],
      value: `${randomData(maxValue)}.00`,
    });
  }
  return {
    visualMap: {
      type: "piecewise",
      splitNumber: 5,
      min: 0,
      max: maxValue,
      bottom: 0,
      left: 92,
      itemHeight: 16,
      itemWidth: 16,
      itemGap: 0,
      textGap: 10,
      show: true,
      borderRadius: 0,
      text: ["高", "低"],
      inRange: {
        color: ["#DCEBFF", "#B9D7FF", "#519AFF", "#FFA108", "#FF5400"],
        symbol: "rect",
      },
    },
    series: [
      {
        type: "map",
        map: "china",
        name: "revenue",
        data: finalData,
        itemStyle: {
          normal: {
            borderColor: "white",
          },
          emphasis: {
            areaColor: "#0086e2",
          },
        },
        label: {
          normal: {
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
            padding: [20, 12],
            position: "inside",
            align: "left",
            shadowColor: "rgba(0,0,0,0.5)",
            shadowBlur: 6,
            shadowOffsetY: 2,
            formatter: (params) =>
              `{name|${params.name}}\n{info|${title}：}{value|${params.value}}`,
            rich: {
              name: {
                fontSize: 14,
                lineHeight: 20,
                color: "#666",
                align: "left",
              },
              info: {
                fontSize: 12,
                lineHeight: 18,
                color: "#666",
                align: "left",
              },
              value: {
                fontSize: 12,
                lineHeight: 18,
                color: "#519AFF",
                align: "left",
              },
            },
          },
        },
      },
    ],
  };
}
function RegionChartPage() {
  const echartsRef = React.useRef();
  const [echart, setEchart] = React.useState(null);

  React.useEffect(() => {
    if (echartsRef) {
      // 基于准备好的dom，初始化echarts实例
      const echart = echarts.init(echartsRef.current);
      setEchart(echart);
    }
  }, [echartsRef]);
  React.useEffect(() => {
    if (echart) {
      // 绘制图表
      const option = getRegionChartOption();
      echart.setOption(option);
    }
  }, [echart]);
  return (
    <div
      ref={echartsRef}
      className={`${styles.echartsContainer} ${styles.regionChart}`}
    ></div>
  );
}

export default function EChartsPage() {
  return (
    <>
      <DemoChartPage />
      <RegionChartPage />
    </>
  );
}
