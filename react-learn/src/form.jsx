class NameFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '输入名字' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('提交的名字: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    名字:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="提交" />
            </form>
        );
    }
}

class EssayForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: '编写DOM元素文章' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('文章内容为: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    文章:
                    <textarea cols="30" rows="10" value={this.state.value} />
                </label>
                <input type="submit" value="提交" />
            </form>
        );
    }
}

class FlavoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "coconut",
            text: "椰子",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let index = 1;
        for (let key in event.target) {
            let value = event.target[key];
            // 判断类型是否为函数
            let isFunc = value && {}.toString.call(value) === '[object Function]';
            if (isFunc) {
                console.log(index + " " + key, ": ", value);
                index += 1;
            } else {
                console.log("function: ", value);
            }
        }
        this.setState({
            value: event.target.value,
            text: event.target.options[event.target.selectedIndex].text
        });
    }

    handleSubmit(event) {
        alert('你喜欢的水果: ' + this.state.value + "(" + this.state.text + ")");
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    选择你喜欢的水果:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">柠檬</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </label>
                <input type="submit" value="提交" />
            </form>
        );
    }
}

class Reservation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isGoing: true,
            numberOfGuests: 2
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            // 更新给定输入名称对应的state值
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <label>
                    参与:
                    <input type="checkbox"
                        name="isGoing"
                        checked={this.state.checked}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    来宾人数:
                    <input type="number"
                        name="numberOfGuests"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}
                    />
                </label>
            </form>
        );
    }
}
function App(props) {
    return (
        <div>
            <NameFrom />
            <EssayForm />
            <FlavoForm />
            <Reservation />
        </div>
    );
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);