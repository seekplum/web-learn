var app = new Vue({
    el: "#app",
    data: {
        message: "Hello Vue!"
    }
})

var app2 = new Vue({
    el: "#app2",
    data: {
        message: "页面加载于" + new Date().toLocaleString()
    }
})

var app3 = new Vue({
    el: "#app3",
    data: {
        seen: true
    }
})


var app4 = new Vue({
    el: "#app4",
    data: {
        todos: [
            { text: "学习HTML" },
            { text: "学习CSS" },
            { text: "学习JavaScript" },
            { text: "学习Vue" }
        ]
    }
})


var app5 = new Vue({
    el: "#app5",
    data: {
        message: "Hello Vue.js!"
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split(" ").reverse().join(" ")
        }
    }
})

var app6 = new Vue({
    el: "#app6",
    data: {
        message: "Hello Vue!"
    }
})

Vue.component("todo-item", {
    // 组件接收一个 `prop` 自定义特性，这个 `prop` 的名字为 todo
    props: ["todo"],
    template: "<li>{{ todo.text }}</li>"
})

var app7 = new Vue({
    el: "#app7",
    data: {
        groceryList: [
            { id: 0, text: "HTML" },
            { id: 1, text: "CSS" },
            { id: 2, text: "JavaScript" },
        ]
    }
})

var app8 = new Vue({
    el: "#app8",
    data: {
        rawHtml: '<span style="color: red">显示红色文字</span>'
    }
})

var app9 = new Vue({
    el: "#app9",
    data: {
        isButtonDisabled: true,
        dynamicId: "div9"
    }
})

var app10 = new Vue({
    el: "#app10",
    data: {
        number: 9,
        ok: true,
        message: "a b c d",
        id: 12345
    }
})
