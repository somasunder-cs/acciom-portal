import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ListGroup, Button, Col } from 'react-bootstrap';
import { getOrganizationUsersList, retriveUserRoleByUserId } from '../actions/userManagementActions';
import  RoleListItemContainer  from './RoleListItemContainer';

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
	showEditContent = (user) => {
		this.setState({isEditable: true});
		// console.log(user);
		let org_id = 1; //TODO: to be removed onced organization switch implementation is done
		// this.props.getSelectedUser(org_id, user.user_id);

	}

	getOrgUserList = () => {
		let userList = '';
		if (this.props.orgUserList.length > 0) {
			userList = this.props.orgUserList.map((user, index) =>{
				console.log('user here', user)
				return (
					<li key={index} className="list-group-item" >
						<Col sm={1}><i className="fas fa-user-circle"></i></Col>
						<Col sm={7}>
							<span className="fName" >{user.first_name}</span>
							<span className="email" >{user.email}</span>
						</Col>
						<Col sm={4} className="editBtn">
							<Link to={`/edit_user_role/${user.user_id}`}>
								<Button type="button" bsStyle="primary">Edit</Button>
							</Link>	
						</Col>
					</li>
				);
			});
		}

		return userList;
	};

	render() {
		const { isEditable } = this.state;
		return (
			<div id="userManagement">
				<ListGroup>
					{ this.getOrgUserList() }
				</ListGroup>
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