/** @format */

import React from "react";

import echarts from "echarts/lib/echarts"; // 引入 ECharts 主模块
import "echarts/lib/chart/bar"; // 引入柱状图
import "echarts/lib/component/tooltip"; // 引入提示框
import "echarts/lib/component/title"; // 引入标题组件

import "./EChartsPage.css";

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
function getChartOption(title) {
  title = title || "ECharts 入门示例";
  const showData = Object.keys(CHART_OPTION_MAP).map((key) => {
    return CHART_OPTION_MAP[key];
  });
  showData.sort((a, b) => a.order - b.order);
  let xAxisData = Object.keys(showData).map((key) => showData[key].name);
  let seriesData = Array.from({ length: xAxisData.length }, (v, idx) =>
    Math.floor(Math.random() * 10 + 1)
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
      //   axisLabel: {
      //     rotate: 30,
      //   },
      data: xAxisData,
    },
    yAxis: {
      name: "销售数据",
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

export default function EChartsPage() {
  const echartsRef = React.useRef();
  const [echart, setEchart] = React.useState(null);

  React.useEffect(() => {
    if (echartsRef) {
      console.log("useEffect echartsRef");
      // 基于准备好的dom，初始化echarts实例
      const echart = echarts.init(echartsRef.current);
      setEchart(echart);
    }
  }, [echartsRef]);
  React.useEffect(() => {
    if (echart) {
      // 绘制图表
      const option = getChartOption();
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
      style={{ width: 400, height: 400 }}
      className="effectEcharts"
    ></div>
  );
}
