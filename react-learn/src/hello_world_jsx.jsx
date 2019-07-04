function tick() {
    const element = (
        <div>
            <h1>Hello World!</h1>
            <h2>当前时间: {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}
setInterval(tick, 1000);