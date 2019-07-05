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

* 下载js

```bash
wget -O static/js/react/react.production.min.js  https://unpkg.com/react@16/umd/react.production.min.js
wget -O static/js/react/react-dom.production.min.js  https://unpkg.com/react-dom@16/umd/react-dom.production.min.js
wget -O static/js/react/babel.min.js https://unpkg.com/babel-standalone@6/babel.min.js
```

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

## 更新已渲染元素

React元素是不可变对象，一旦被创建，就无法更改它的子元素或者属性。

更新UI的唯一方式就是创建一个全新的元素，并将其传入 `ReactDOM.render()`

**在实践中，大多数React应用只会调用一个 `ReactDOM.render()`,做法是讲代码封装到有状态组件中.**

## 导入本地React JS报错

* 错误信息

```text
Access to script at 'file:react.production.min.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
```

React会有同源策略，需要在根目录通过启动服务的保证html和jsx在同一个服务中。

* 安装node提供的http server

```bash
npm install http-server -g
```

* 在React根目录下启动服务

```bash
http-server . -o
```

或者使用Python启动

```bash
python -m SimpleHTTPServer 8080
```

* 通过服务进行访问html，如

[http://127.0.0.1:8080/src/hello_word_jsx.html](http://127.0.0.1:8080/src/hello_word_jsx.html)

## 组件 & Props

### 函数组件

```typescript jsx
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

### 类组件

```typescript jsx
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

两者效果是等价的，**注意: 组件名称必须以 `大写字母开头`, React会将以 `小写` 字母开头的组件视为是原生的DOM标签.**

## 渲染组件

```typescript jsx
const element = <Welcome name="World" />;
```

React元素为用户自定义的组件时,它会将JSX所接收的属性(attributes)转换为单个对象传递给组件，这个对象被称之为 `props`

## props只读性

**所有的React组件都不允许修改 `props`.**

## State & 生命周期

### 将函数组件转换为class组件

每次组件更新时 `render` 方法都会被调用，但只要在相同的DOM节点中渲染组件，那么就仅有一个组件的class实例被创建使用。

### 不要直接修改State

```typescript jsx
this.state.comment = "test";  // 此种方式代码不会重新渲染组件
this.setState({comment: "test"});  // 会重新渲染组件
```

**构造函数是唯一可以给state赋值的地方，其它时候都应该使用 `this.setState()` 进行修改.**

### State的更新可能是异步的

出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。

因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

例如，此代码可能会无法更新计数器：

```typescript jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```typescript jsx
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

### State的更新会被合并

当你调用 `setState()` 的时候，React会把你提供的对象合并当前的state。

这里的合并是浅合并，和Python中字典的 `update` 方法效果一致。

### 数据是向下流动的

不管是父组件还是子组件都无法知道某个组件时有状态的还是无状态的，并且它们并不关心它是函数组件还是类组件。

每个组件时相互独立，内部的状态不会相互影响。

## 事件处理

* React事件的命名采用 `小驼峰式(camelcase)`
* 使用JSX语法时需要传入一个函数作为事件处理函数，而不是一个字符串
* 无法通过 `return false`的方式阻止默认行为，必须显示的使用 `preventDefault`

```html
<a href="#" onclick="console.log('按钮被点击.'); return false">点击按钮</a>
```

```typescript jsx
function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log("按钮被点击!");
    }
    return (
        <a href="#" onClick={handleClick}>
            点击按钮
    </a>
    );
}

ReactDOM.render(
    <ActionLink />,
    document.getElementById('root')
);
```

## 阻止组件渲染

对已经渲染的组件进行隐藏，可以通过 `render` 方法返回 `null` 的方式进行处理。

## key

* 警告信息

`a key should be provided for list items`, 意思为当你创建一个元素时，必须包括一个特殊的 `key` 属性。

`key` 帮助React识别哪些元素改变了，比如被添加或删除。因此需要给数组中的每个元素赋予一个确定的标识。

一个元素的 `key` 最好是这个元素在列表中拥有的唯一字符串，通常是使用 `id` 作为元素的key。

当元素确定没有 `id` 的时候，不得已可以使用元素的索引 `index` 作为 key。

如果列表项目的顺序可能会变化，则不建议使用索引作为key值，原因是这样做会导致性能变差，还可能引起组件状态问题。

### 用key提取组件

元素key只有放在就近的数组上下文中才有意义。

在 `map()` 方法中的元素需要设置key属性。

### key只是在兄弟节点之间必须唯一

即不需要全局唯一

## 表单

在React中，HTML表单元素的工作方式和其他DOM元素有些不同，这是因为表单元素通常会保持一些内部的 `state`.

### 受控组件

在HTML中，表单元素(如 `<input>`, `<textarea>`, `<select>`)通常是自身维护state,并根据用户输入进行更新。

在React中，可变状态(mutable state)通常是保持在组件的state属性中，并只能通过 `setState()` 来更新。

### select标签

React并不会使用 `selected` 属性，而是跟 `select` 标签上使用 `value` 属性。

### 受控输入空值

在受控组件上指定value的prop可以防止用户更改输入。

如果指定了 `value` 后想进行编辑，则可以将 `value` 设置为 `undefined` 或 `null`

```typescript jsx
ReactDOM.render(
    <input value="hi" />,
    document.getElementById('root')
);

setTimeout(() => {
    ReactDOM.render(
        <input value={null} />,
        document.getElementById('root')
    );
}, 1000);
```

## 状态提升

在React中，将多个组件中需要共享的state向上移动到它们最近共同父组件中，便可实现共享state。

## 组合 VS 继承

React有非常强大的组合模式，推荐使用组合而非继承来实现组件间的代码重用。

```javascript
<div>
                <SplitPane
                    left={
                        <Contacts />
                    }
                    right={
                        <Chat />
                    } />
            </div>
            <div>
                <WelcomeDilog />
                <SignUpDialog />
            </div>
```

## 参考

* [React 中文文档](https://react.docschina.org/docs/getting-started.html)
