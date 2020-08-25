import React from 'react';


class MessageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var message = {
            user: this.props.user,
            text: this.state.text
        }
        this.props.onMessageSubmit(message);
        this.setState({ text: '' });
    }

    changeHandler(e) {
        console.log(e.target.value);
        this.setState({ text: e.target.value });
    }

    render() {
        return (
            <div className='message_form'>
                <form onSubmit={(e) => this.handleSubmit(e)} className="d-flex">
                    <input
                        placeholder="Nhập tin nhắn ..."
                        className="form-control"
                        onChange={(e) => this.changeHandler(e)}
                        value={this.state.text}
                    />

                    <button type="button" className="btn btn-success ml-3"
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        Gửi
                    </button>
                </form>
            </div>
        );
    }
}

export default MessageForm;