import React, { Component} from 'react';
import Select from 'react-select';

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
    state = {
    	selectedProjectData: null,
    	selectedRoleData: null,
    };

    handleProjectChange = selectedProjectData => {
      	this.setState({ selectedProjectData });
    };

    handleRoleChange = selectedRoleData => {
    	this.setState({ selectedRoleData });
    };

    render() {
    	const { selectedProjectData } = this.state;
    	const { selectedRoleData } = this.state;
    
      	return (
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
      	);
    }
}

export default UserManagement;