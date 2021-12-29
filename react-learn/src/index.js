/** @format */
import React from "react";
import ReactDOM from "react-dom";
import SwiperTest from "./swiper_test";

function Index() {
  return (
    <div>
      <div>执行 npm start 查看页面效果!!!</div>
      <SwiperTest />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
