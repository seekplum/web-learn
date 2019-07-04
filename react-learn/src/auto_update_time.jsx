/**
 * 自动更新时间，每秒刷新一次
 */

class Clock extends React.Component {
    /**
     * 构造函数
     */
    constructor(props) {
        super(props); // 调用父类的构造函数
        this.state = { date: new Date() };
    }

    /**
     * 挂载方法
     * 
     * 当组件第一渲染到DOM的时候进行调用
     */
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000);
    }

    /**
     * 卸载方法
     * 
     * 当组件在DOM中被删除时调用
     */
    componentWillUnmount() {
        clearInterval(self.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    /**
     * 在构造函数之后进行调用
     */
    render() {
        return (
            <div>
                <h1>Hello React!</h1>
                <p>当前时间: {this.state.date.toLocaleTimeString()}.</p>
            </div>
        );
    }
}

function App() {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
