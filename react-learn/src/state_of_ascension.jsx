/**
 *  状态提升
 * 
 * 保存两个输入框数据同步
 */

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>水已经沸腾了.</p>;
    }
    return <p>水还在煮开中...</p>;
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);

    if (Number.isNaN(input)) {
        return '';
    }

    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

const scaleNames = {
    c: '摄氏度',
    f: '华氏温度'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>
                    输入温度类型为 {scaleNames[scale]}:
                </legend>
                <input value={temperature}
                    onChange={this.handleChange}
                />
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {
            temperature: '',
            scale: 'c'
        };
    }

    handleCelsiusChange(temperature) {
        this.setState({
            scale: 'c',
            temperature: temperature
        });
    }

    handleFahrenheitChange(temperature) {
        this.setState({
            scale: 'f',
            temperature: temperature
        });
    }
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
            </div>
        );
    }
}

function App(props) {
    return (
        <div>
            <Calculator />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);