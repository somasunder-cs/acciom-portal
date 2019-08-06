import React, { Component } from "react";
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Button, Panel, Form, Col} from 'react-bootstrap';

import { addDatabaseDetails, getDBDetailsById, updateDBDetails} from '../actions/dbDetailsActions';

class AddDbDetails extends Component {

	constructor(props) {
		super(props);
		console.log('AddDbDetails constructor props ', props);
		this.initialiseFormState();
	}

	getInitialFormData = (db_connection_id) =>{
		const formDataObj = {'project_id': 2};
        if (db_connection_id) {
			formDataObj['db_connection_id'] = db_connection_id;
		}
		return formDataObj;
	}

	initialiseFormState = () => {
		const dbTypeId= (this.props.match && this.props.match.params) ? this.props.match.params.id : null;
		this.state = {
			formData: this.getInitialFormData(dbTypeId),
			errors: {}, 
			formSubmitted: false, 
			loading: true,
			selectedDbDetails: null,
			isEditMode: false
		};
	}
	
	static getDerivedStateFromProps = (nextProps, prevState) => {
		if (prevState.loading && !prevState.selectedDbDetails && nextProps.selectedDbDetails) {
			return {
				...prevState,
				formData: {
					...prevState.formData,
					'connection_name' : nextProps.selectedDbDetails.connection_name,
					'db_type_name' : nextProps.selectedDbDetails.db_type_name,
					'db_name' : nextProps.selectedDbDetails.db_name,
					'db_hostname' : nextProps.selectedDbDetails.db_hostname,
					'db_username' : nextProps.selectedDbDetails.db_username,
					'db_password' : nextProps.selectedDbDetails.db_password
				},
                loading : false
			};
		}
		return null;
	}

	componentDidMount() {
		const dbTypeId = this.state.formData['db_connection_id'];
		if (dbTypeId)  {
			this.setState({isEditMode:true});
			this.props.getDBDetailsById(dbTypeId);
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
			if (this.state.isEditMode) {
			  this.props.updateDBDetails(JSON.stringify(this.state.formData));
			} else {
			  this.props.addDatabaseDetails(JSON.stringify(this.state.formData));
			}
		} else {
			this.setState({
				errors,
				formSubmitted: true
			});
		}
	};

	render() {
 		return (
			<div className="addDbDetailsForm">
				<Panel>
					<Panel.Heading>Add DB Details</Panel.Heading>
					<Panel.Body>
						<Form onSubmit={this.formSubmit} horizontal>
							<FormGroup controlId="formControlsConnName">
								<Col sm={4}><ControlLabel>Connection Name</ControlLabel></Col>
								<Col sm={8}><FormControl value={this.state.formData.connection_name} type="text" name="connection_name" onChange={this.handleInputChange} /></Col>
							</FormGroup >
							<FormGroup controlId="formControlsDbType">
								<Col sm={4}><ControlLabel>Database Type</ControlLabel></Col>
								<Col sm={8}><FormControl value={this.state.formData.db_type_name} type="text" name="db_type_name" onChange={this.handleInputChange} /></Col>
							</FormGroup >
							<FormGroup controlId="formControlsDbName">
								<Col sm={4}><ControlLabel>Database Name</ControlLabel></Col>
								<Col sm={8}><FormControl value={this.state.formData.db_name} type="text" name="db_name" onChange={this.handleInputChange} /></Col>
							</FormGroup >
							<FormGroup controlId="formControlsHostName">
								<Col sm={4}><ControlLabel>Host Name</ControlLabel></Col>
								<Col sm={8}><FormControl value={this.state.formData.db_hostname} type="text" name="db_hostname" onChange={this.handleInputChange} /></Col>
							</FormGroup >
							<FormGroup controlId="formControlsUsername">
								<Col sm={4}><ControlLabel>User Name</ControlLabel></Col>
								<Col sm={8}><FormControl value={this.state.formData.db_username} type="text" name="db_username" onChange={this.handleInputChange} /></Col>
							</FormGroup >
							<FormGroup controlId="formControlsPassword">
								<Col sm={4}><ControlLabel>Password</ControlLabel></Col>
								<Col sm={8}><FormControl value={this.state.formData.db_password} type="text" name="db_password" onChange={this.handleInputChange} /></Col>
							</FormGroup >

							<FormGroup className="formFooter">
								<Button type="submit" bsStyle="primary">Submit</Button>
								<Button type="button" bsStyle="primary">Test Connection</Button>
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
	return {
		updatedDbDetails: state.dbDetailsData.updatedDbDetails,
		selectedDbDetails: state.dbDetailsData.selectedDbDetails
	};
};

const mapDispatchToProps = dispatch => ({
	addDatabaseDetails: (data) => dispatch(addDatabaseDetails(data)),
	getDBDetailsById: (data) => dispatch(getDBDetailsById(data)),
	updateDBDetails: (data) => dispatch(updateDBDetails(data))	
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDbDetails);