/**
 * 组合 VS 继承
 */

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

function WelcomeDilog() {
    return (
        <Dialog
            title="欢迎"
            message="感谢你的参观"
        />
    );
}


function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-mesage">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = { login: '' };
    }

    handleChange(e) {
        this.setState({
            login: e.target.value
        });
    }

    handleSignUp() {
        alert(`欢迎来到火星, ${this.state.login}!`)
    }

    render() {
        return (
            <Dialog title="火星探测计划"
                message="该如何称呼您?">

                <input value={this.state.login}
                    onChange={this.handleChange} />
                <button onClick={this.handleSignUp}>
                    登陆火星!
                </button>
            </Dialog>
        );
    }
}

function Contacts() {
    return <div className="Contacts" />;
}

function Chat() {
    return <div className="Chat" />;
}

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="content">

            <div className="splitpane">
                <SplitPane
                    left={
                        <Contacts />
                    }
                    right={
                        <Chat />
                    } />
            </div>
            <div className="welcome">
                <WelcomeDilog />
            </div>
            <div className="welcome">
                <SignUpDialog />
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
