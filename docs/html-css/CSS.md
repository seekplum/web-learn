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

## CSS 盒子模型

![盒子模型](/static/images/ct_boxmodel.gif)

## CSS 边框属性

|属性 | 描述|
|:---|:--------|
|border | 简写属性，用于把针对四个边的属性设置在一个声明。|
|border-style | 用于设置元素所有边框的样式，或者单独地为各边设置边框样式。|
|border-width | 简写属性，用于为元素的所有边框设置宽度，或者单独地为各边边框设置宽度。|
|border-color | 简写属性，设置元素的所有边框中可见部分的颜色，或为 4 个边分别设置颜色。|
|border-bottom | 简写属性，用于把下边框的所有属性设置到一个声明中。|
|border-bottom-color | 设置元素的下边框的颜色。|
|border-bottom-style | 设置元素的下边框的样式。|
|border-bottom-width | 设置元素的下边框的宽度。|
|border-left | 简写属性，用于把左边框的所有属性设置到一个声明中。|
|border-left-color | 设置元素的左边框的颜色。|
|border-left-style | 设置元素的左边框的样式。|
|border-left-width | 设置元素的左边框的宽度。|
|border-right | 简写属性，用于把右边框的所有属性设置到一个声明中。|
|border-right-color | 设置元素的右边框的颜色。|
|border-right-style | 设置元素的右边框的样式。|
|border-right-width | 设置元素的右边框的宽度。|
|border-top | 简写属性，用于把上边框的所有属性设置到一个声明中。|
|border-top-color | 设置元素的上边框的颜色。|
|border-top-style | 设置元素的上边框的样式。|
|border-top-width | 设置元素的上边框的宽度。|

## CSS 定位属性

CSS 定位属性允许你对元素进行定位。

|属性|描述|
|:---|:--------|
|position|把元素放置到一个静态的、相对的、绝对的、或固定的位置中。|
|top|定义了一个定位元素的上外边距边界与其包含块上边界之间的偏移。|
|right|定义了定位元素右外边距边界与其包含块右边界之间的偏移。|
|bottom|定义了定位元素下外边距边界与其包含块下边界之间的偏移。|
|left|定义了定位元素左外边距边界与其包含块左边界之间的偏移。|
|overflow|设置当元素的内容溢出其区域时发生的事情。|
|clip|设置元素的形状。元素被剪入这个形状之中，然后显示出来。|
|vertical-align|设置元素的垂直对齐方式。|
|z-index|设置元素的堆叠顺序。|

### 绝对定位(absolute), 固定定位(fixed)区别

* 1.没有滚动条的情况下没有差异
* 2.在有滚动条的情况下，fixed定位不会随滚动条移动而移动，absolute则会随滚动条移动

一般fixed用在遮盖层和固定在页面某个问题，如固定在顶端的菜单栏，弹出提示框居中显示

## CSS浮动

### float

|值|描述|
|:---|:--------|
|left|元素向左浮动。|
|right|元素向右浮动。|
|none|默认值。元素不浮动，并会显示在其在文本中出现的位置。|
|inherit|规定应该从父元素继承 float 属性的值。|

## 类选择器还是 ID 选择器

* 1.区别 1：只能在文档中使用一次

与类不同，在一个 HTML 文档中，ID 选择器会使用一次，而且仅一次。

* 2.区别 2：不能使用 ID 词列表

不同于类选择器，ID 选择器不能结合使用，因为 ID 属性不允许有以空格分隔的词列表。

* 3.区别 3：ID 能包含更多含义

类似于类，可以独立于元素来选择 ID。有些情况下，您知道文档中会出现某个特定 ID 值，但是并不知道它会出现在哪个元素上，所以您想声明独立的 ID 选择器。

## CSS 后代选择器

两个元素的层次间隔可以是无限的

## 相邻兄弟选择器

用一个结合符只能选择两个相邻兄弟中的第二个元素

## 伪类

W3C："W3C" 列指示出该属性在哪个 CSS 版本中定义（CSS1 还是 CSS2）。

|属性|描述|CSS|
|:---|:--------|:---|
|:active|向被激活的元素添加样式。|1|
|:focus|向拥有键盘输入焦点的元素添加样式。|2|
|:hover|当鼠标悬浮在元素上方时，向元素添加样式。|1|
|:link|向未被访问的链接添加样式。|1|
|:visited|向已被访问的链接添加样式。|1|
|:first-child|向元素的第一个子元素添加样式。|2|
|:lang|向带有指定 lang 属性的元素添加样式。|2|

## 伪元素

W3C："W3C" 列指示出该属性在哪个 CSS 版本中定义（CSS1 还是 CSS2）。

|属性|描述|CSS|
|:---|:--------|:---|
|:first-letter|向文本的第一个字母添加特殊样式。|1|
|:first-line|向文本的首行添加特殊样式。|1|
|:before|在元素之前添加内容。|2|
|:after|在元素之后添加内容。|2|

## CSS 水平对齐

### margin

使用 margin 属性来水平对齐,可通过将左和右外边距设置为 "auto"，来对齐块元素。

### position

使用绝对定位，绝对定位元素会被从正常流中删除，并且能够交叠元素。

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        .margin {
            margin: auto;
            width: 300px;
            background-color: burlywood;
        }

        .position {
            position: absolute;
            right: 0px;
            width: 300px;
            background-color: burlywood;
        }
    </style>
</head>

<body>
    <div class="margin">
        <p>测试居中文本，测试居中文本</p>
        <p>测试居中文本，测试居中文本</p>
    </div>
</body>

</html>
```

### 跨浏览器兼容性问题

当像这样对齐元素时，对 \<body> 元素的外边距和内边距进行预定义是一个好主意。这样可以避免在不同的浏览器中出现可见的差异。

当使用 position 属性时，IE8 以及更早的版本存在一个问题。如果容器元素（在我们的案例中是 \<div class="container">）设置了指定的宽度，并且省略了 !DOCTYPE 声明，那么 IE8 以及更早的版本会在右侧增加 17px 的外边距。这似乎是为滚动条预留的空间。当使用 position 属性时，请始终设置 !DOCTYPE 声明：

### float

使用 float 属性来进行左和右对齐

```css
.right {
    float:left;
    width:300px;
    background-color:#b0e0e6;
}
```

## CSS 尺寸属性

CSS 尺寸属性允许你控制元素的高度和宽度。同样，还允许你增加行间距。

|属性|描述|
|:---|:--------|
|height|设置元素的高度。|
|line-height|设置行高。|
|max-height|设置元素的最大高度。|
|max-width|设置元素的最大宽度。|
|min-height|设置元素的最小高度。|
|min-width|设置元素的最小宽度。|
|width|设置元素的宽度。|

## CSS 分类属性 (Classification)

CSS 分类属性允许你控制如何显示元素，设置图像显示于另一元素中的何处，相对于其正常位置来定位元素，使用绝对值来定位元素，以及元素的可见度。

|属性|描述|
|:---|:--------|
|clear|设置一个元素的侧面是否允许其他的浮动元素。|
|cursor|规定当指向某元素之上时显示的指针类型。|
|display|设置是否及如何显示元素。|
|float|定义元素在哪个方向浮动。|
|position|把元素放置到一个静态的、相对的、绝对的、或固定的位置中。|
|visibility|设置元素是否可见或不可见。|

### display的可选值

值|描述|
|:---|:--------|
|none|此元素不会被显示。|
|block|此元素将显示为块级元素，此元素前后会带有换行符。|
|inline|默认。此元素会被显示为内联元素，元素前后没有换行符。|
|inline-block|行内块元素。（CSS2.1 新增的值）|
|list-item|此元素会作为列表显示。|
|run-in|此元素会根据上下文作为块级元素或内联元素显示。|
|compact|CSS 中有值 compact，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。|
|marker|CSS 中有值 marker，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。|
|table|此元素会作为块级表格来显示（类似 \<table>），表格前后带有换行符。|
|inline-table|此元素会作为内联表格来显示（类似 \<table>），表格前后没有换行符。|
|table-row-group|此元素会作为一个或多个行的分组来显示（类似 \<tbody>）。|
|table-header-group|此元素会作为一个或多个行的分组来显示（类似 \<thead>）。|
|table-footer-group|此元素会作为一个或多个行的分组来显示（类似 \<tfoot>）。|
|table-row|此元素会作为一个表格行显示（类似 \<tr>）。|
|table-column-group|此元素会作为一个或多个列的分组来显示（类似 \<colgroup>）。|
|table-column|此元素会作为一个单元格列显示（类似 \<col>）|
|table-cell|此元素会作为一个表格单元格显示（类似 \<td> 和 \<th>）|
|table-caption|此元素会作为一个表格标题显示（类似 \<caption>）|
|inherit|规定应该从父元素继承 display 属性的值。|

## cursor

定义鼠标指针悬浮在元素上方显示的鼠标光标

MDN[cursor](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)
