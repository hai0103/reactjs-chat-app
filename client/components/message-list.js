import React from 'react';
import Message from './message';

class MessageList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
		return (
			<div className='messages'>
				{/* <h2> Conversation: </h2> */}
				{
					this.props.messages.map((message, i) => {
						return (
							<Message
								key={i}
								user={message.user}
								text={message.text} 
							/>
						);
					})
				} 
			</div>
		);
	}
}

export default MessageList;