'use strict'

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

var app11 = new Vue({
    el: "#app11",
    data: {
        message: "Hello",
    },
    computed: {
        reverseMessage: function () {
            return this.message.split("").reverse().join("");
        }
    }
})

var app12 = new Vue({
    el: "#app12",
    data: {
        firstName: "Foo",
        lastName: "Bar",
        fullName: "Foo Bar"
    },
    watch: {
        firstName: function (val) {
            this.fullName = val + " " + this.lastName;
        },
        lastName: function (val) {
            this.fullName = this.firstName + " " + val;
        }
    }
})

var app13 = new Vue({
    el: "#app13",
    data: {
        firstName: "Foo",
        lastName: "Bar"
    },
    computed: {
        fullName2: function () {
            return this.firstName + " " + this.lastName;
        }
    }
})

var app14 = new Vue({
    el: "#app14",
    data: {
        firstName: "Foo",
        lastName: "Bar"
    },
    computed: {
        fullName: {
            // getter
            get: function () {
                return this.firstName + " " + this.lastName;
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(" ")
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    }
})

var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
        // 如果 `question` 发生改变，这个函数就会运行
        question: function (newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.debouncedGetAnswer()
        }
    },
    created: function () {
        // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
        // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
        // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
        // 请参考：https://lodash.com/docs#debounce
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
        getAnswer: function () {
            if (this.question.indexOf('?') === -1) {
                this.answer = 'Questions usually contain a question mark. ;-)'
                return
            }
            this.answer = 'Thinking...'
            var vm = this
            axios.get('https://yesno.wtf/api')
                .then(function (response) {
                    vm.answer = _.capitalize(response.data.answer)
                })
                .catch(function (error) {
                    vm.answer = 'Error! Could not reach the API. ' + error
                })
        }
    }
})
