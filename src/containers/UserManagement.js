import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { ListGroup, Button, Col } from 'react-bootstrap';
import { getOrganizationUsersList, retriveUserRoleByUserId } from '../actions/userManagementActions';

const projectData = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: '  Strawberry' },
	{ value: 'vanilla', label: '  Vanilla' }
];

const roleData = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla', isDisabled: true }
];

const addRow = () => {
	console.log('clicked');
};

const deleteRow = () => {
	console.log('clicked');
};

class UserManagement extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isOrganisationInitialised: false,
			isEditable : false
		};
	}
	
	static getDerivedStateFromProps = (nextProps, prevState) => {
		if (!prevState.isOrganisationInitialised && 
			nextProps.isOrganisationInitialised > 0) {
			console.log('UserManagement.getDerivedStateFromProps() load org users');
			let orgId = 1;//TODO: hard coded value. To be cleaned up after org switch
			nextProps.getOrganizationUsersList(orgId);
		}
		return ({
			isOrganisationInitialised: nextProps.isOrganisationInitialised
		});
	}

	handleProjectChange = selectedProjectData => {
		this.setState({ selectedProjectData });
	};

	handleRoleChange = selectedRoleData => {
		this.setState({ selectedRoleData });
	};

	showEditContent = (user) => {
		this.setState({isEditable: true});
		console.log(user);
		let org_id = 1; //TODO: to be removed onced organization switch implementation is done
		this.props.getSelectedUser(org_id, user.user_id);
	}

	getOrgUserList = () => {
		let userList = '';
		if (this.props.orgUserList.length > 0) {
			userList = this.props.orgUserList.map((user) =>{
				console.log('user here')
				return (
					<li className="list-group-item" >
						<Col sm={1}><i class="fas fa-user-circle"></i></Col>
						<Col sm={7}>
							<span className="fName" >{user.first_name}</span>
							<span className="email" >{user.email}</span>
						</Col>
						<Col sm={4} className="editBtn">	
							<Button onClick={() => this.showEditContent(user)}>Edit</Button>
						</Col>
					</li>
				);
			});
		}

		return userList;
	};

	renderDrowDownData = (selectedProjectData, selectedRoleData) => {
		return (
			<div>
				<Select 
						className='singleSelect'
						value={selectedProjectData}
						onChange={this.handleProjectChange}
						options={projectData}
					/>
					<Select
						className='multiSelect'
						isMulti='true'
						value={selectedRoleData}
						onChange={this.handleRoleChange}
						options={roleData}
					/>
					<i className='fas fa-plus-circle plusCircle' onClick={() => addRow()}></i>
					<i className='fas fa-minus-circle minusCircle' onClick={() => deleteRow()}></i>
			</div>
		)
	}

	render() {
		const { selectedProjectData } = this.state;
		const { selectedRoleData } = this.state;
		const { isEditable } = this.state;
		return (
			<div id="userManagement">
				<ListGroup>
					{ this.getOrgUserList() }
				</ListGroup>;
				<div>
					
				</div>

				{(isEditable && this.props.selectedUserRole) ? (<div className='row'>
					<h3 className="editableHeader">Manage Role</h3>
					<div className = "DescriptionHeader">Email</div>
					<input type="text" value={this.props.selectedUserRole.email_id} className="Description" readonly disabled/>
					{this.renderDrowDownData(selectedProjectData, selectedRoleData)}
				</div>) : null}
			</div>
		);
	 }
}

const mapStateToProps = (state) => {
	console.log('UserManagement.mapStateToProps() ', state);
	return {
		orgUserList: state.userManagementData.orgUserList? state.userManagementData.orgUserList: [],
		projectList: state.appData.projectList? state.appData.projectList: [],
		isOrganisationInitialised: state.appData.isOrganisationInitialised,
		selectedUserRole: state.userManagementData.selectedUserRole ? state.userManagementData.selectedUserRole : []
	};
};

const mapDispatchToProps = dispatch => ({
	getOrganizationUsersList: (data) => dispatch(getOrganizationUsersList(data)),
	getSelectedUser: (org_id, user_id) => dispatch(retriveUserRoleByUserId(org_id, user_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);