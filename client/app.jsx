import UsersList from './components/users';
import Message from './components/message';
import MessageList from './components/message-list';
import MessageForm from './components/message-form';
import ChangeNameForm from './components/change-name-form';
import ChatApp from './chat-app';

var React = require('react');

var socket = io.connect();

var ChatApp1 = React.createClass({

	getInitialState() {
		return {
			users: [],
			messages: [],
			text: ''
		};
	},

	componentDidMount() {
		socket.on('init', this._initialize);
		socket.on('send:message', this._messageRecieve);
		socket.on('user:join', this._userJoined);
		socket.on('user:left', this._userLeft);
		socket.on('change:name', this._userChangedName);
	},

	_initialize(data) {
		var { users, name } = data;
		this.setState({ users, user: name });
	},

	_messageRecieve(message) {
		var { messages } = this.state;
		messages.push(message);
		this.setState({ messages });
	},

	_userJoined(data) {
		var { users, messages } = this.state;
		var { name } = data;
		users.push(name);
		messages.push({
			user: 'Thông báo ',
			text: name + ' Đã tham gia'
		});
		this.setState({ users, messages });
	},

	_userLeft(data) {
		var { users, messages } = this.state;
		var { name } = data;
		var index = users.indexOf(name);
		users.splice(index, 1);
		messages.push({
			user: 'Thông báo ',
			text: name + ' Đã thoát'
		});
		this.setState({ users, messages });
	},

	_userChangedName(data) {
		var { oldName, newName } = data;
		var { users, messages } = this.state;
		var index = users.indexOf(oldName);
		users.splice(index, 1, newName);
		messages.push({
			user: 'Thông báo ',
			text: 'Đổi tên: ' + oldName + ' ==> ' + newName
		});
		this.setState({ users, messages });
	},

	handleMessageSubmit(message) {
		var { messages } = this.state;
		messages.push(message);
		this.setState({ messages });
		socket.emit('send:message', message);
	},

	handleChangeName(newName) {
		var oldName = this.state.user;
		socket.emit('change:name', { name: newName }, (result) => {
			if (!result) {
				return alert('Lỗi rồi !!');
			}
			var { users } = this.state;
			var index = users.indexOf(oldName);
			users.splice(index, 1, newName);
			this.setState({ users, user: newName });
		});
	},

	render() {
		return (
			<div className="container">
				<h3 className='text-center m-5'>Chat App</h3>

				<div className='row mt-4'>
					<div className="area-chat-box card col-8 shadow">
						<MessageList
							messages={this.state.messages}
						/>
						<MessageForm
							onMessageSubmit={this.handleMessageSubmit}
							user={this.state.user}
						/>
					</div>

					<div className="card col-4 shadow p-4" >
						<UsersList
							users={this.state.users}
						/>

						<ChangeNameForm
							onChangeName={this.handleChangeName}
						/>
					</div>
				</div>
			</div>
		);
	}
});

React.render(<ChatApp1 />, document.getElementById('app')); 