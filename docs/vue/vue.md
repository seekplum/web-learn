# Vue学习

## github

Vue源码[地址](https://github.com/vuejs/vue)

## CDN

* 最新版本

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
```

* 生产环境

对于生产环境，我们推荐链接到一个明确的版本号和构建文件，以避免新版本造成的不可预期的破坏：

```html
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

* 开发环境

```html
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

## 声明式渲染

`v-bind` 特性被称为指令。指令带有 `v-` 前缀，表示是Vue提供的特殊属性。

`v-bind:title="message"` 代表元素的 `title` 特性和Vue示例的 `message` 属性保持一致。

Vue 还提供了 `v-model` 指令，它能轻松实现表单输入和应用状态之间的双向绑定。

## 数据与方法

当vue实例中的数据改变时，视图会重新渲染，**但只有当实例被创建时 `data` 中存在的属性才是 `响应式` 的。**

如果需要在后续中使用一个属性，但是在一开始它为空或不存在，那么可以再实例化时设置一些初始值。

`Object.freeze()` 可以阻止修改现有属性，意味着响应系统无法再追踪变化。

## 实例生命周期钩子

每个Vue实例在被创建时都要经过一系列的初始化过程，如 需要设置数据监听、编译模板、将实例挂载到DOM并在数据变化时更新DOM等。

钩子有 `created`, `mounted`, `updated`, `destroyed`等。生命周期钩子的 `this` 上下文指向调用它的Vue实例。

注意: **不要在选项属性或回调上使用箭头函数，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。**

![Vue生命周期图示](/static/images/lifecycle.png)
