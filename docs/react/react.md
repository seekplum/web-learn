# 入门React

## 中文资料

* [React中文文档](https://react.docschina.org/docs/getting-started.html)

## 搭建本地开发环境

* 1.确保你安装了较新版本的 Node.js。
* 2.按照 Create React App 安装指南创建一个新的项目

```bash
npx create-react-app react-learn
```

* 3.删除掉新项目中 src/ 文件夹下的所有文件。

注意: 不要删除整个 src 文件夹，删除里面的源文件。我们会在接下来的步骤中使用示例代码替换默认源文件。

```bash
rm -f react-learn/src/*
```

* 4.创建index.css文件

```bash
cat >react-learn/src/index.css<<EOF
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}

ol, ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.square:focus {
  outline: none;
}

.kbd-navigation .square:focus {
  background: #ddd;
}

.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

EOF
```

* 5.创建index.js文件

```bash
cat >react-learn/src/index.js<<EOF
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

EOF
```

* 6.启动项目

```bash
npm start
```

启动后再浏览器上访问[http://localhost:3000](http://localhost:3000)

## 概念

在 React 应用中，数据通过 props 的传递，从父组件流向子组件。

## 原生JavaScript使用React

* test.html

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>一分钟上手React</title>
</head>

<body>

    <h2>一分钟上手React</h2>
    <p>演示如何使用React.</p>
    <p>React加载 Button, 并完成点击事件的监听.</p>

    <!-- React更新的div. -->
    <div id="like_button_container">
    </div>

    <!-- 加载 React。-->
    <!-- 注意: 部署时，将 "development.js" 替换为 "production.min.js"。-->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

    <!-- 加载我们的自定义的 React 组件。-->

    <!-- Load our React component. -->
    <script src="test.js"></script>

</body>

</html>
```

* test.js

```javascript
'use strict';

const likeElement = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }
    render() {
        if (this.state.liked) {
            return likeElement(
                'button',
                { onClick: () => this.setState({ liked: false }) },
                '取消点击'
            )
        }
        return likeElement(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            '点击'
        );
    }
}


const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(likeElement(LikeButton), domContainer);
```

## 为生产环境压缩JavaScript代码

* 1.安装nodejs
* 2.在React项目目录执行以下命令

```bash
npm init -y
```

* 3.安装terser

```bash
npm install terser

cd src
npx terser -c -m -o like_button.min.js -- like_button.js
```

* 4.项目中使用min.js

## React 和 JSX

`like_button.html` 中的示例只依赖了浏览器原生的特性，React和普通的bootstrap等方式使用没有什么区别。

```javascript
const e = React.createElement;

// 显示一个 "Like" <button>
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```

使用React的JSX方式代替上面的实现

```typescript jsx
// 显示一个 "Like" <button>
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```

## crossorigin属性

为什么要设置crossorigin属性，**可以在React 16及以上版本中有更好的错误处理体验.**

同时建议验证使用的 CDN 是否设置了 `Access-Control-Allow-Origin: *` HTTP请求头
