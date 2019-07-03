'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return '你选择了 ' + this.props.commentID + ' 评论';
        }

        return e(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            '点击'
        );
    }
}

document.querySelectorAll('.like_button_container').forEach(domContainer => {
    // 从 data-* 属性中获取评论 ID
    const commentID = parseInt(domContainer.dataset.commentid, 10);

    ReactDOM.render(
        e(LikeButton, { commentID: commentID }),
        domContainer
    );
});