import React, { Component } from 'react';
import{ connect } from 'react-redux';
import { Row, Button, FormGroup, FormControl, ControlLabel, HelpBlock, Panel } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import Dashboard from '../containers/Dashboard';
import { forgetPassword } from '../actions/loginActions';

class ForgotPassword extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		formData: {}, // Contains login form data
		errors: {}, // Contains login field errors
		formSubmitted: false, // Indicates submit status of login form 
		loading: false,
		value:'' // Indicates in progress state of login form
		};
		this.updateInput = this.updateInput.bind(this);
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

	getConfirmtionMessage(e) {
		e.preventDefault();
		console.log(this.state.value);
		let emailAdd = {
			"email": this.state.value
		};
		this.props.forgetPassword(JSON.stringify(emailAdd));
	}

	updateInput(evt){
		this.setState({value: evt.target.value})   
	}
	

	render(){
		const { errors, formSubmitted } = this.state;
		 const accesstoken = () => {
			 return <div>Hello</div>
		 }

		return(
			<div className='forgotPassword'>
				<div className='frgtpassheading'>Forgot Password</div>
				<Panel>
					<Panel.Body>
						<input type="text" ref="emailAddrss" className='frgtpassfield' onChange={this.updateInput} placeholder="Enter Email Id"></input>
						<Button className='frgtpassbtn' bsStyle="primary" onClick={(e) => {this.getConfirmtionMessage(e)}}>Send Link</Button>
					</Panel.Body>
				</Panel>
			</div>
		    );
	}
}

//old_pssword, new_password


const mapStateToProps = (state) => {
	return {
		forgetPasswordChanged: state.loginData.forgetPasswordChanged
	};
};

const mapDispatchToProps = dispatch => ({
	forgetPassword: (data) => dispatch(forgetPassword(data))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);