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
			isOrganisationInitialised: false
		};
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

	 // state = {
	 // 	selectedProjectData: null,
	 // 	selectedRoleData: null,
	 // };

	handleProjectChange = selectedProjectData => {
		this.setState({ selectedProjectData });
	};

	handleRoleChange = selectedRoleData => {
		this.setState({ selectedRoleData });
	};

	getOrgUserList = () => {
		let userList = '';
		if (this.props.orgUserList.length > 0) {
			userList = this.props.orgUserList.map((user) =>{
				console.log('user here')
				return (
					// <ListGroupItem header={user.first_name}>
					// 	{user.email}
					// </ListGroupItem>
					<li className="list-group-item" >
						<Col sm={1}><i class="fas fa-user-circle"></i></Col>
						<Col sm={7}>
							<span className="fName">{user.first_name}</span>
							<span className="email">{user.email}</span>
						</Col>
						<Col sm={4} className="editBtn">	
							<Button>Edit</Button>
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

		return (
			<div id="userManagement">
				<ListGroup>
					{ this.getOrgUserList() }
				</ListGroup>;
				<div>
					
				</div>

				<div className='row'>

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