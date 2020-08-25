import React from 'react';


class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
		return (
			<div className="message">
				<strong>{this.props.user}: </strong> 
				<span>{this.props.text}</span>		
			</div>
		);
	}
}

export default Message;