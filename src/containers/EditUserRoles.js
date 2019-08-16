import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retriveUserRoleByUserId, addNewUserRole, deleteUserRole } from '../actions/userManagementActions';
import { roleTypes } from '../reducers/userManagementReducer';
import RoleListItemContainer from './RoleListItemContainer';

class EditUserRoles extends Component {

	componentDidMount(){
		const userId = (this.props.match && this.props.match.params) ? this.props.match.params.id : null;
		this.props.getSelectedUser(this.props.currentOrg.org_id, userId);
	}

	onAddRowClick = () => {
		this.props.addNewUserRole();
	};

	onDeleteRowClick = (type, index) => {
		this.props.deleteUserRole(type, index);
	};

	getRoleItemComponent = (list, type, showAdd, showDelete) => {
		let roleElements = []; 

		roleElements = list.map((item, index) => {
			return (
				<li key={`${type}${index}`}>
					<RoleListItemContainer 
						onAddRowClick={this.onAddRowClick}
						onDeleteRowClick={this.onDeleteRowClick}
						showAddBtn={showAdd && list.length === (index+1)}
						showDeleteBtn={(!showDelete && list.length === 1)? false : true }
						index={index} 
						type={type}
						selectedProjectId = {item.project_id}
						selectedRoles = {item.allowed_role_list}
					/>
				</li>
			);
		});

		return roleElements;
	}

	renderUserRoles = () => {
		let element = null; 

		if (this.props.selectedUser) {
			let orgRoleElements = [];
			let projRoleElements = [];
			let newRoleElements = [];
			let showAdd = false;
			let showDelete = true;

			if (this.props.userProjectRoleList.length === 0 && this.props.userNewRoleList.length === 0) {
				showAdd = true;
				showDelete = false;
			}
			orgRoleElements = this.getRoleItemComponent(this.props.userOrgRoleList, roleTypes.ORGANIZATION, showAdd, showDelete);
			
			if (this.props.userNewRoleList.length === 0) {
				showAdd = true;
				showDelete = false;
			}
			projRoleElements = this.getRoleItemComponent(this.props.userProjectRoleList, roleTypes.PROJECT, showAdd, showDelete);
			
			showAdd = true;
			showDelete = false;
			newRoleElements = this.getRoleItemComponent(this.props.userNewRoleList, roleTypes.NEW, showAdd, showDelete);

			element = [...orgRoleElements, ...projRoleElements, ...newRoleElements];
		}

		return element;
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