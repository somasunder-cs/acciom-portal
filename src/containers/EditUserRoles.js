import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retriveUserRoleByUserId } from '../actions/userManagementActions';
import RoleListItemContainer from './RoleListItemContainer';

class EditUserRoles extends Component {

    componentDidMount(){
		const userId = (this.props.match && this.props.match.params) ? this.props.match.params.id : null;
        this.props.getSelectedUser(this.props.currentOrg.org_id, userId);
    }

    renderUserRoles = () => {
        let element = null; 

        if (this.props.selectedUserRole) {
            let orgElement = null;
            let projElement = [];

            if (this.props.selectedUserRole.org_allowed_role_list) {
                orgElement= (<li key={1}><RoleListItemContainer /></li>);
            }
            element = [orgElement, ...projElement];
        }

        return element;
    };
	render() {
		return (
			<div id="editUserRoles">
                <h3 className="editableHeader">Manage Role</h3>
                <div className = "DescriptionHeader">Email</div>
                <input type="text" value={this.props.selectedUserRole.email_id} className="Description" disabled/>

                { this.renderUserRoles() }

			</div>
		);
	 }
}

const mapStateToProps = (state) => {
	return {
        currentOrg: state.appData.currentOrg,
		selectedUserRole: state.userManagementData.selectedUserRole ? state.userManagementData.selectedUserRole : []
	};
};

const mapDispatchToProps = dispatch => ({
	getSelectedUser: (org_id, user_id) => dispatch(retriveUserRoleByUserId(org_id, user_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserRoles);