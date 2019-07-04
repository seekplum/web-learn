/**
 * 
 * 加载组件
 */


function Welcome(props) {
    return <h1>Hello {props.name}!</h1>;
}

/**
 * 组合组件
 * 
 * App组件内把 Welcome组件给组织起来 
 * */
function App() {
    return (
        <div>
            <Welcome name="World"></Welcome>
            <Welcome name="Test"></Welcome>
            <Welcome name="React"></Welcome>
        </div>
    );
}

function Avatar(props) {
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name} />
    );
}

function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}

function formatDate(date) {
    return date.toLocaleDateString();
}


function Comment(props) {
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}


const comment = {
    date: new Date(),
    text: "学习 React.",
    author: {
        name: "seekplum",
        avatarUrl: "../public/favicon.ico"
    },
}


ReactDOM.render(
    <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author}
    />,
    document.getElementById('root')
);