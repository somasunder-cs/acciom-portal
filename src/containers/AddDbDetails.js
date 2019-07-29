import React, { Component } from "react";
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Button, Panel, Form, Col} from 'react-bootstrap';

import { addDatabaseDetails } from '../actions/dbDetailsActions';

class AddDbDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
			formData: {
				'project_id': 2 // remove hardcoded project later
			},
			errors: {}, 
			formSubmitted: false, 
			loading: false
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot)  {
		console.log('AddDbDetails.componentDidUpdate prevProps ', prevProps );
		console.log('AddDbDetails.componentDidUpdate prevState ', prevState );
		console.log('AddDbDetails.componentDidUpdate props ', this.props);
		if (this.props.updatedDbDetails) {
			// redirect to db details view page 
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
							{/* 
								<FieldGroup id="formControlsConnName" type="text" label="Connection Name" name="connection_name" />
								FieldGroup id="formControlsDbType" type="text" label="Database Type" name="db_type_name" />
								<FieldGroup id="formControlsDbName" type="text" label="Database Name" name="db_name" />
								<FieldGroup id="formControlsHostName" type="text" label="Host Name" name="db_hostname" />
								<FieldGroup	id="formControlsUsername" type="text" label="User Name" name="db_username" />
								<FieldGroup id="formControlsPassword" label="Password" type="password" name="db_password" />
							 */}

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
								<Button type="button" bsStyle="primary">Cancel</Button>
								<Button type="submit" bsStyle="primary">Submit</Button>
							</FormGroup>
						</Form>
					</Panel.Body>
				</Panel>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		updatedDbDetails: state.dbDetailsData.updatedDbDetails
	};
};

const mapDispatchToProps = dispatch => ({
	addDatabaseDetails: (data) => dispatch(addDatabaseDetails(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDbDetails);