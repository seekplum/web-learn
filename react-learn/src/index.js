/** @format */
import React from "react";
import ReactDOM from "react-dom";
import EChartsPage from "./EChartsPage";
import SomePage from "./SubscribePage";

function Index() {
  return (
    <div>
      <div>执行 npm start 查看页面效果!!!</div>
      <EChartsPage />
      <SomePage />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
