/**
 * 
 * 列表中的key处理
 */

function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            )}
        </ul>
    );

    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );

    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
}


const posts = [
    { id: 1, title: 'Hello world!', content: 'Welcom to learning React!' },
    { id: 2, title: 'Installaction', content: 'You can install React from npm.' }
];
ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('root')
);