import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ListGroup, Button, Col } from 'react-bootstrap';
import { retriveUserRoleByUserId, addNewUserRole, deleteUserRole } from '../actions/userManagementActions';
import { roleTypes } from '../reducers/userManagementReducer';
import RoleListItemContainer from './RoleListItemContainer';

class EditUserRoles extends Component {

	constructor (props) {
		super(props);
		this.state = {
			selectedUser: null
		};
	}

	componentDidMount(){
		const userId = (this.props.match && this.props.match.params) ? this.props.match.params.id : null;
		// this.roleContainers = [];
		this.props.getSelectedUser(this.props.currentOrg.org_id, userId);
	}

	static getDerivedStateFromProps = (nextProps, prevState) => {
		console.log('EditUserRoles()==== nextProps', nextProps);
		console.log('EditUserRoles()==== prevState', prevState);
		if (!prevState.selectedUser && nextProps.selectedUser) {
			return {
				...prevState,
				selectedUser: nextProps.selectedUser
			};
		}
		return prevState;
	};

	onAddRowClick = () => {
		this.props.addNewUserRole();
	};

	onDeleteRowClick = (type, index) => {
		this.props.deleteUserRole(type, index);
	};

	getRoleItemComponent = (list) => {
		let roleElements = [];
		// let roleContainerRef = null; 
		const count = list.length;
		// this.roleContainers = [];
		roleElements = list.map((item, index) => {
			let showAdd = false;
			let showDelete = true;
			if (count === 1) {
				showDelete = false;
			}
			if (count-1 === index) {
				showAdd = true;
			}
			// roleContainerRef = React.createRef();
			// this.roleContainers.push(roleContainerRef);
			return (
				<li key={`${item.roleType}${index}`}>
					<RoleListItemContainer 
						onAddRowClick={this.onAddRowClick}
						onDeleteRowClick={this.onDeleteRowClick}
						showAddBtn={showAdd && list.length === (index+1)}
						showDeleteBtn={(!showDelete && list.length === 1)? false : true }
						index={index} 
						roleType={item.roleType}
						id={item.id}
						selectedRoles = {item.allowed_role_list}
						// ref={roleContainerRef}
					/>
				</li>
			);
		});

		return roleElements;
	}

	renderUserRoles = () => {
		let element = null; 

		console.log('editUserRoles.renderUserRoles() ', this.state.selectedUser);

		if (this.props.selectedUser) {

			let userRoleList = [];

			if (this.props.userOrgRoleList.length > 0) {
				userRoleList = [{
					id: `o_${this.props.currentOrg.org_id}`, 
					allowed_role_list: this.props.userOrgRoleList, 
					roleType: roleTypes.ORGANIZATION
				}];
			}

			if (this.props.userProjectRoleList.length > 0) {
				let userProjectRoleList = this.props.userProjectRoleList.map((item) => {
					return {
						id: `p_${item.project_id}`, 
						allowed_role_list: item.allowed_role_list, 
						roleType: roleTypes.PROJECT
					};
				});
				userRoleList = userRoleList.concat(userProjectRoleList);
			}

			if (this.props.userNewRoleList.length > 0) {
				userRoleList = [...userRoleList, ...this.props.userNewRoleList];
			}

			element = this.getRoleItemComponent(userRoleList);

			if (element.length > 0) {
				element.push(
					(<div class='footer'>
						<Link to={`/user_management`}>
							<Button type="button" bsStyle="primary">Back To User List</Button>
						</Link>
						<Button type="button" bsStyle="primary" onClick={(e) => {this.onSaveUserRoles()}}>Save</Button>
					</div>)
				);
			}
		}

		return element;
	};

	onSaveUserRoles = () => {
		console.log('onSaveUserRoles() ===', this.roleContainerRef);
	};
	
	render() {
		return (
			<div id="editUserRoles">
				<h3 className="editableHeader">Manage Role</h3>
				<div className = "DescriptionHeader">Email</div>
				<input type="text" value={this.props.selectedUser.email_id} className="Description" disabled/>

				{ this.renderUserRoles() }

			</div>
		);
	 }
}

const mapStateToProps = (state) => {
	return {
		currentOrg: state.appData.currentOrg,
		selectedUser: state.userManagementData.selectedUser,
		userOrgRoleList: state.userManagementData.userOrgRoleList,
		userProjectRoleList: state.userManagementData.userProjectRoleList,
		userNewRoleList: state.userManagementData.userNewRoleList
	};
};

const mapDispatchToProps = dispatch => ({
	getSelectedUser: (org_id, user_id) => dispatch(retriveUserRoleByUserId(org_id, user_id)),
	addNewUserRole: (data) => dispatch(addNewUserRole(data)),
	deleteUserRole: (roleType, index) => dispatch(deleteUserRole(roleType, index))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserRoles);