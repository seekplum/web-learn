# 层叠样式表(Cascading Style Sheets)

## 多重样式将层叠为一个

样式表允许以多种方式规定样式信息。样式可以规定在单个的 HTML 元素中，在 HTML 页的头元素中，或在一个外部的 CSS 文件中。甚至可以在同一个 HTML 文档内部引用多个外部样式表。

### 层叠次序

当同一个 HTML 元素被不止一个样式定义时，会使用哪个样式呢？

一般而言，所有的样式会根据下面的规则层叠于一个新的虚拟样式表中，其中数字 4 拥有最高的优先权。

* 1.浏览器缺省设置
* 2.外部样式表
* 3.内部样式表（位于 \<head> 标签内部）
* 4.内联样式（在 HTML 元素内部）

因此，内联样式（在 HTML 元素内部）拥有最高的优先权，这意味着它将优先于以下的样式声明：\<head> 标签中的样式声明，外部样式表中的样式声明，或者浏览器中的样式声明（缺省值）。

## 语法

```css
selector {declaration1; declaration2; ... declarationN }
```

## CSS 选择器参考手册

|选择器|描述|
|:---|:--------|
|[attribute]|用于选取带有指定属性的元素。|
|[attribute=value]|用于选取带有指定属性和值的元素。|
|[attribute~=value]|用于选取属性值中包含指定词汇的元素。|
|[attribute\|=value]|用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。|
|[attribute^=value]|匹配属性值以指定值开头的每个元素。|
|[attribute$=value]|匹配属性值以指定值结尾的每个元素。|
|[attribute*=value]|匹配属性值中包含指定值的每个元素。|

## CSS 背景属性

|属性|描述|
|:---|:--------|
|background|简写属性，作用是将背景属性设置在一个声明中。|
|background-attachment|背景图像是否固定或者随着页面的其余部分滚动。|
|background-color|设置元素的背景颜色。|
|background-image|把图像设置为背景。|
|background-position|设置背景图像的起始位置。|
|background-repeat|设置背景图像是否及如何重复。|

## CSS 文本属性

|属性|描述|
|:---|:--------|
|color|设置文本颜色|
|direction|设置文本方向。|
|line-height|设置行高。|
|letter-spacing|设置字符间距。|
|text-align|对齐元素中的文本。|
|text-decoration|向文本添加修饰。|
|text-indent|缩进元素中文本的首行。|
|text-shadow|设置文本阴影。CSS2 包含该属性，但是 CSS2.1 没有保留该属性。|
|text-transform|控制元素中的字母。|
|unicode-bidi|设置文本方向。|
|white-space|设置元素中空白的处理方式。|
|word-spacing|设置字间距。|

## CSS 字体属性

|属性|描述|
|:---|:--------|
|font|简写属性。作用是把所有针对字体的属性设置在一个声明中。|
|font-family|设置字体系列。|
|font-size|设置字体的尺寸。|
|font-size-adjust|当首选字体不可用时，对替换字体进行智能缩放。（CSS2.1 已删除该属性。）|
|font-stretch|对字体进行水平拉伸。（CSS2.1 已删除该属性。）|
|font-style|设置字体风格。|
|font-variant|以小型大写字体或者正常字体显示文本。|
|font-weight|设置字体的粗细。|

## 设置链接的样式

```css
a:link {color: blue;} /* 未被访问的链接 */
a:visited {color: red;} /* 已被访问的链接 */
a:hover {color: yellow;} /* 鼠标指针移动到链接上 */
a:active {color: white;} /* 正在被点击的链接 */
```

当为链接的不同状态设置样式时，请按照以下次序规则：

* 1.a:hover 必须位于 a:link 和 a:visited 之后
* 2.a:active 必须位于 a:hover 之后

## CSS Table 属性

|属性|描述|
|:---|:--------|
|border-collapse|设置是否把表格边框合并为单一的边框。|
|border-spacing|设置分隔单元格边框的距离。|
|caption-side|设置表格标题的位置。|
|empty-cells|设置是否显示表格中的空单元格。|
|table-layout|设置显示单元、行和列的算法。|
