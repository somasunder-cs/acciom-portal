import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux'; 
import { getRolesByProjectId } from '../actions/userManagementActions';


const projectData = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
];

const roleData = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla', isDisabled: true }
];


class RoleListItemContainer extends Component {
    constructor(props) {
		super(props);
		this.state = {
			selectedProjectData: {},
			selectedRoleData:{}
		};
    }
	
	handleProjectChange = selectedProject => {
		console.log('handleProjectChange() selectedProject ', selectedProject);
		this.props.getRolesByProjectId(selectedProject.value);
	};

	formatListData = (listData) => {
		let formatedList = listData.map((item) => {
			return { value: item.project_id, label: item.project_name }
		});
		return formatedList;
	};

	formatRoleListData = (listData) => {
		let formatedList = [];
		if(listData) {
			formatedList = listData.map((item) => {
				return { value: item.role_id, label: item.role_name }
			});
		}
		return formatedList;
	}

    render() {
		console.log("project list", this.props.projectList);
		console.log("role list", this.props.rolesList);
        const addRow = () => {
            console.log('clicked');
        };
        
        const deleteRow = () => {
            console.log('clicked');
        };
        const { selectedProjectData } = this.state.selectedProjectData;
		const { selectedRoleData } = this.state.selectedRoleData;
		console.log(this.props);

        return (
            <div>
                <Select 
						className='singleSelect'
						onChange={ (item) => this.handleProjectChange(item) }
						options= {this.formatListData(this.props.projectList)}
						defaultValue={ this.props.projectList[0].value }
					/>
					<Select
						className='multiSelect'
						isMulti='true'
						// value={selectedRoleData}
						onChange={this.handleRoleChange}
						options={this.formatRoleListData(this.props.rolesList)}
					/>
					<i className='fas fa-plus-circle plusCircle' onClick={() => addRow()}></i>
					<i className='fas fa-minus-circle minusCircle' onClick={() => deleteRow()}></i>
            </div>
        )
    };
}

const mapStateToProps = (state) => {
	return {
		currentOrg: state.appData.currentOrg,
		projectList: state.appData.projectList,
		rolesList: state.userManagementData.rolesList
	};
};

const mapDispatchToProps = dispatch => ({
	getRolesByProjectId:(project_id) => dispatch(getRolesByProjectId(project_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleListItemContainer);