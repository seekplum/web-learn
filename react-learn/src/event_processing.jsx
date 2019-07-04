/**
 * 按钮开关切换
 */

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // 第一种方法
        // 为了在回调中使用 this , 需要进行绑定, 若不想进行绑定，则使用箭头函数进行处理
        // this.handleClick = this.handleClick.bind(this); 
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            // 第一种方法
            // <button onClick={this.handleClick}> 

            /* 第二种方法 */
            /** 
            <button onClick={(e) => this.handleClick(e)}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
            */

            /* 第三种方法 */
            <button onClick={this.handleClick.bind(this)}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);