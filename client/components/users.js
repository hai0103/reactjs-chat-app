import React from 'react';


class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
		return (
			<div className='users'>
				<h5> Người online: </h5>
				<ul>
					{
						this.props.users.map((user, i) => {
							return (
								<li key={i}>
									{user}
								</li>
							);
						})
					}
				</ul>				
			</div>
		);
	}
}

export default Users;