import React from 'react';


class ChangeNameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newName: ''
        }
    }

	onKey(e) {
		this.setState({ newName : e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		var newName = this.state.newName;
		this.props.onChangeName(newName);	
		this.setState({ newName: '' });
	}

	render() {
		return(
			<div className='change_name_form'>
				<h5> Đổi tên </h5>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<input
                        placeholder="Nhập tên mới"
                        className="form-control"
						onChange={(e) => this.onKey(e)}
						value={this.state.newName} 
					/>
				</form>	
			</div>
		);
	}
}

export default ChangeNameForm;