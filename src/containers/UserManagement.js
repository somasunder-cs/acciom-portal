import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { ListGroup, Button, Col } from 'react-bootstrap';
import { getOrganizationUsersList } from '../actions/userManagementActions';

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
		this.showEditContent = this.showEditContent.bind(this);
	}
	
	componentDidMount() {
		this.props.getOrganizationUsersList(1);
	}

	static getDerivedStateFromProps = (nextProps, prevState) => {
		if (!prevState.isOrganisationInitialised && 
			nextProps.isOrganisationInitialised > 0) {
			console.log('UserManagement.getDerivedStateFromProps() load org users');
			// nextProps.getOrganizationUsersList(1);
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

	showEditContent = (event) => {
		this.setState({isEditable: true});
		console.log(event);
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
							<Button onClick={this.showEditContent}>Edit</Button>
						</Col>
					</li>
				);
			});
		}

		return userList;
	}

	render() {
		const { selectedProjectData } = this.state;
		const { selectedRoleData } = this.state;
		const { isEditable } = this.state;
		console.log(isEditable);
		return (
			<div id="userManagement">
				<ListGroup>
					{ this.getOrgUserList() }
				</ListGroup>;
				<div>
					
				</div>

				{isEditable ? (<div className='row'>
					<h3 className="editableHeader">Manage Role</h3>
					<div className="userNameHeader">Name</div>
					<input type="text" className="user_name" />
					<div className = "DescriptionHeader">Description</div>
					<input type="text" className="Description" />
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
		isOrganisationInitialised: state.appData.isOrganisationInitialised
	};
};

const mapDispatchToProps = dispatch => ({
	getOrganizationUsersList: (data) => dispatch(getOrganizationUsersList(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);