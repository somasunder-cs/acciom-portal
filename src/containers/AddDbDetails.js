import React, { Component } from "react";
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Button, Panel, Form, Col} from 'react-bootstrap';

import { addDatabaseDetails } from '../actions/dbDetailsActions';

class AddDbDetails extends Component {

	constructor(props) {
		super(props);
		this.initialiseFormState();
	}

	componentDidUpdate(prevProps, prevState, snapshot)  {
		console.log('AddDbDetails.componentDidUpdate prevProps ', prevProps );
		console.log('AddDbDetails.componentDidUpdate prevState ', prevState );
		console.log('AddDbDetails.componentDidUpdate props ', this.props);
		if (this.props.updatedDbDetails) {
			// redirect to db details view page 
			// this.initialiseFormState();
		}
	}

	initialiseFormState = () => {
		this.state = {
			formData: {
				'project_id': 2 // remove hardcoded project later
			},
			errors: {}, 
			formSubmitted: false, 
			loading: false
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
	
	getConfirmationMessage = () => {
		if (this.props.updatedDbDetails) {
			return (<div>Database details added successfully.</div>);
		} else {
			return '';
		}
	}
	
	formSubmit = (e) => {
		e.preventDefault();
		const errors = true;

		if (errors === true){
			this.props.addDatabaseDetails(JSON.stringify(this.state.formData));
		} else {
			this.setState({
				errors,
				formSubmitted: true
			});
		}
	};

	render() {
		/*
		const  me = this;
		function FieldGroup({ id, label, help, ...props }){
			return (
				<FormGroup controlId={id}>
					<Col componentClass={ControlLabel} sm={4}>{label}</Col>
					<Col sm={8}>
						<FormControl {...props} onChange={ me.handleInputChange }/>
					</Col>
					{help && <HelpBlock>{help}</HelpBlock>}
				</FormGroup>
			);
		}
		*/
 		return (
			<div className="addDbDetailsForm">
				<Panel>
					<Panel.Heading>Add DB Details</Panel.Heading>
					<Panel.Body>
						<Form onSubmit={this.formSubmit} horizontal>
							<FormGroup controlId="formControlsConnName">
								<Col sm={4}><ControlLabel>Connection Name</ControlLabel></Col>
								<Col sm={8}><FormControl type="text" name="connection_name" onChange={this.handleInputChange} /></Col>
							</FormGroup >
							<FormGroup controlId="formControlsDbType">
								<Col sm={4}><ControlLabel>Database Type</ControlLabel></Col>
								<Col sm={8}><FormControl type="text" name="db_type_name" onChange={this.handleInputChange} /></Col>
							</FormGroup >
							<FormGroup controlId="formControlsDbName">
								<Col sm={4}><ControlLabel>Database Name</ControlLabel></Col>
								<Col sm={8}><FormControl type="text" name="db_name" onChange={this.handleInputChange} /></Col>
							</FormGroup >
							<FormGroup controlId="formControlsHostName">
								<Col sm={4}><ControlLabel>Host Name</ControlLabel></Col>
								<Col sm={8}><FormControl type="text" name="db_hostname" onChange={this.handleInputChange} /></Col>
							</FormGroup >
							<FormGroup controlId="formControlsUsername">
								<Col sm={4}><ControlLabel>User Name</ControlLabel></Col>
								<Col sm={8}><FormControl type="text" name="db_username" onChange={this.handleInputChange} /></Col>
							</FormGroup >
							<FormGroup controlId="formControlsPassword">
								<Col sm={4}><ControlLabel>Password</ControlLabel></Col>
								<Col sm={8}><FormControl type="text" name="db_password" onChange={this.handleInputChange} /></Col>
							</FormGroup >

							<FormGroup className="formFooter">
								{/* <Button type="button" bsStyle="primary">Cancel</Button> */}
								<Button type="submit" bsStyle="primary">Submit</Button>
							</FormGroup>
						</Form>
					</Panel.Body>
					<Panel.Body>{ this.getConfirmationMessage() }</Panel.Body>
				</Panel>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	console.log('AddDBDetails.mapStateToProps() ===>', state);
	return {
		updatedDbDetails: state.dbDetailsData.updatedDbDetails
	};
};

const mapDispatchToProps = dispatch => ({
	addDatabaseDetails: (data) => dispatch(addDatabaseDetails(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDbDetails);