import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux'; 
import { getRolesByProjectId, getRolesByOrgId } from '../actions/userManagementActions';
import { roleTypes } from '../reducers/userManagementReducer';

const getObjFromList = (list, key, value)=> list.find(v => v[key] === value);

const formatProjectListData = (listData) => {
	const formatedList = listData.map((item) => {
		return { value: `p_${item.project_id}`, label: item.project_name, roleType: roleTypes.PROJECT, uid: item.project_id} ;
	});
	return formatedList;
};

const formatRoleListData = (rolesList) => {
	let formatedList = [];
	if (rolesList) {
		formatedList = rolesList.map((item) => {
			return { value: item.role_id, label: item.role_name };
		});
	}
	return formatedList;
};

const getSelectedRoleItems = (rolesList, selectedRoles) => {
	let selectedItems = rolesList.filter(role => {
		return selectedRoles.includes(role.value);
	});
	return selectedItems;
};

class RoleListItemContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orgNProjectList: [],
			selectedOrgProject: null,
			rolesList:[],
			selectedRoles:[]
		};
	}

	componentDidMount() {
		const orgList = [{
			value: `o_${this.props.currentOrg.org_id}`, 
			label: this.props.currentOrg.org_name, 
			roleType: roleTypes.ORGANIZATION,
			uid: this.props.currentOrg.org_id
		}];
		const projectList =  formatProjectListData(this.props.projectList);
		const orgNProjectList = [...orgList, ...projectList];
	
		let selectedOrgProject  = null;
		if (this.props.roleType === roleTypes.ORGANIZATION) {
			selectedOrgProject = getObjFromList(orgList, 'value', this.props.id);
		} else if (this.props.roleType === roleTypes.PROJECT) {
			selectedOrgProject = getObjFromList(projectList, 'value', this.props.id);
		}
		
		if (selectedOrgProject) {
			this.getRolesByOrgRProject(selectedOrgProject);
		}
		this.setState({orgNProjectList, selectedOrgProject});
	}

	static getDerivedStateFromProps = (nextProps, prevState) => {
		if (prevState.selectedOrgProject && prevState.rolesList.length === 0) {
			if (nextProps.orgProjectRolesList.hasOwnProperty(prevState.selectedOrgProject.value)) {
				const rolesList = formatRoleListData(nextProps.orgProjectRolesList[prevState.selectedOrgProject.value]);
				const selectedRoles = getSelectedRoleItems(rolesList, nextProps.selectedRoles);
				return {
					...prevState,
					rolesList,
					selectedRoles
				};
			}
		}
		
		return prevState;
	}

	getRolesByOrgRProject = (selectedOrgProject) => {
		if (this.props.orgProjectRolesList.hasOwnProperty(selectedOrgProject.value)) return;
		if (selectedOrgProject.roleType ===  roleTypes.ORGANIZATION ) {
			this.props.getRolesByOrgId(selectedOrgProject.uid, selectedOrgProject.value);
		} else if (selectedOrgProject.roleType ===  roleTypes.PROJECT ) {
			this.props.getRolesByProjectId(selectedOrgProject.uid, selectedOrgProject.value);
		}
	}

	handleOrgProjectChange = selectedOrgProject => {
		if (selectedOrgProject === this.state.selectedOrgProject) {
			return;
		};
		this.setState({selectedOrgProject, rolesList:[]});
		this.getRolesByOrgRProject(selectedOrgProject);
	};

	handleRoleChange = (item) => {
		this.setState({selectedRoles: item});
	};

	addRow = () => {
		this.props.onAddRowClick();
	};
	
	deleteRow = (type, index) => {
		this.props.onDeleteRowClick(type, index);
	};

	render() {
		return (
			<div>
				<Select 
					className='singleSelect'
					value={this.state.selectedOrgProject}
					onChange={ (item) => this.handleOrgProjectChange(item) }
					options= { this.state.orgNProjectList }
				/>

				<Select
					className='multiSelect'
					isMulti='true'
					value={this.state.selectedRoles}
					onChange={ (item) => this.handleRoleChange(item) }
					options={ this.state.rolesList }
				/>

				{ this.props.showDeleteBtn ? 
					<i className='fas fa-minus-circle minusCircle' onClick={() => this.deleteRow(this.props.roleType, this.props.index)}></i>
					: null
				}

				{ this.props.showAddBtn ? 
					<i className='fas fa-plus-circle plusCircle' onClick={() => this.addRow()}></i>
					: null
				}
			</div>
		);
	};
}

const mapStateToProps = (state) => {
	return {
		currentOrg: state.appData.currentOrg,
		projectList: state.appData.projectList,
		orgProjectRolesList: state.userManagementData.orgProjectRolesList,
	};
};

const mapDispatchToProps = dispatch => ({
	getRolesByOrgId: (orgId, key) => dispatch(getRolesByOrgId(orgId, key)),
	getRolesByProjectId: (projectId, key) => dispatch(getRolesByProjectId(projectId, key))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleListItemContainer);