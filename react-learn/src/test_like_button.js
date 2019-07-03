'use strict';

const likeElement = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }
    render() {
        if (this.state.liked) {
            return likeElement(
                'button',
                { onClick: () => this.setState({ liked: false }) },
                '取消点击'
            )
        }
        return likeElement(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            '点击'
        );
    }
}


const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(likeElement(LikeButton), domContainer);