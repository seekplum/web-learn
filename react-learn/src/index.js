/** @format */
import React from "react";
import ReactDOM from "react-dom";
import EChartsPage from "./EChartsPage";

function Index() {
  return (
    <div>
      <div>执行 npm start 查看页面效果!!!</div>
      <EChartsPage />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
