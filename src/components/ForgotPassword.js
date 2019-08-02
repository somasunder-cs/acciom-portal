import React, { Component } from 'react';
import{ connect } from 'react-redux';
import { Row, Button, FormGroup, FormControl, ControlLabel, HelpBlock, Panel } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import Dashboard from '../containers/Dashboard';

class ForgotPassword extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		formData: {}, // Contains login form data
		errors: {}, // Contains login field errors
		formSubmitted: false, // Indicates submit status of login form 
		loading: false // Indicates in progress state of login form
	}
	}
	
	handleInputChange = ({target}) => {
		const { value, name } = target;

		const { formData } = this.state;
		formData[name] = value;

		this.setState({
			formData
		});
	}

	login = (e) => {
		e.preventDefault();
		// const errors = this.validateLoginForm();

		if (errors === true){
			this.props.changePassword(this.state.formData);
		} else {
			this.setState({
				errors,
				formSubmitted: true
			});
		}
	}

	getConfirmtionMessage() {
     let element = null;
     if (this.props.changePassword) {
		element = (
		   <div>Password Changed SuccessFully.</div>
			) 
	  }
	  return element;
	}

	render(){
		const { errors, formSubmitted } = this.state;
		 const accesstoken = () => {
			 return <div>Hello</div>
		 }

		return(
			<div className='forgotPassword'>
				<Panel>
					<Panel.Body>
						<input type="text" placeholder="Enter Email Id"></input>
						<Button bsStyle="primary">Send Link</Button>
					</Panel.Body>
				</Panel>
			</div>
		);
	}
}

//old_pssword, new_password


const mapStateToProps = (state) => {
	return {
		passwordChanged: state.loginData.passwordChanged
	};
};

const mapDispatchToProps = dispatch => ({
	changePassword: (data) => dispatch(changePassword(data))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);