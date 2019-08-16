import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux'; 
import { getRolesByProjectId } from '../actions/userManagementActions';

const getObjFromList = (list, key, value)=> list.find(v => v[key] === value);

const formatProjectListData = (listData) => {
	let formatedList = listData.map((item) => {
		return { value: item.project_id, label: item.project_name } ;
	});
	return formatedList;
};

const formatRoleListData = (projectRolesList, selectedProject) => {
	let formatedList = [];
	if (selectedProject) {
		const listData = projectRolesList[selectedProject.value];
		if (listData) {
			formatedList = listData.map((item) => {
				return { value: item.role_id, label: item.role_name };
			});
		}
	}
	return formatedList;
};

const getSelectedRoleItems = (rolesList, selectedRoles) => {
	// const selectedItems = [];
	console.log('getSelectedRoleItems rolesList=',rolesList);
	console.log('getSelectedRoleItems selectedRoles=',selectedRoles);
	let selectedItems = rolesList.filter(role => {
		return selectedRoles.includes(role.value);
	})
	console.log('getSelectedRoleItems selectedItems=',selectedItems);
	return selectedItems;
};

class RoleListItemContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectList: [],
			selectedProject: null,
			rolesList:[],
			selectedRoles:[]
		};
	}

	componentDidMount() {
		const projectList =  formatProjectListData(this.props.projectList);
		const selectedProject = getObjFromList(projectList, 'value', this.props.selectedProjectId);
		this.props.getRolesByProjectId(selectedProject.value);
		this.setState({projectList, selectedProject});
	}

	static getDerivedStateFromProps = (nextProps, prevState) => {
		if (prevState.selectedProject && nextProps.projectRolesList.hasOwnProperty(prevState.selectedProject.value) && prevState.rolesList.length === 0) {
			const rolesList = formatRoleListData(nextProps.projectRolesList, prevState.selectedProject);
			const selectedRoles = getSelectedRoleItems(rolesList, nextProps.selectedRoles);
			return {
				...prevState,
				rolesList,
				selectedRoles
			};
		}
		return prevState;
	}

	handleProjectChange = selectedProject => {
		this.setState({selectedProject});
		this.props.getRolesByProjectId(selectedProject.value);
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
					value={this.state.selectedProject}
					onChange={ (item) => this.handleProjectChange(item) }
					options= { this.state.projectList }
				/>

				<Select
					className='multiSelect'
					isMulti='true'
					value={this.state.selectedRoles}
					onChange={ (item) => this.handleRoleChange(item) }
					options={ this.state.rolesList }
				/>

				{ this.props.showDeleteBtn ? 
					<i className='fas fa-minus-circle minusCircle' onClick={() => this.deleteRow(this.props.type, this.props.index)}></i>
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
		orgRolesList: state.userManagementData.orgRolesList,
		projectRolesList: state.userManagementData.projectRolesList,
	};
};

const mapDispatchToProps = dispatch => ({
	getRolesByProjectId: (project_id) => dispatch(getRolesByProjectId(project_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleListItemContainer);