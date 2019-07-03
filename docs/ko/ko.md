# Knockoutjs Demo

## 初始化

```bash
mkdir css js
```

## knockoutjs CDN

* [CDNJS][csnjs]
* [Microsoft Ajax CDN](http://ajax.aspnetcdn.com/ajax/knockout/knockout-3.4.2.js)

## 安装依赖

* 下载knockoutjs

```bash
curl -o js/knockout-min.js https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.0/knockout-min.js
```

[csnjs]: https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.0/knockout-min.js

## 循环

除了在HTML中循环外，还可以通过注释的方式进行循环

```html
<!-- ko if: check_show()  -->
<!-- /ko -->
<!-- ko foreach: button_items -->
<!-- /ko -->
```
