import React from 'react';
import { connect  } from 'react-redux';
import { Button } from 'react-bootstrap';
import { showProjectSwitchPage } from '../actions/appActions';
import { getAllTestSuites } from '../actions/testSuiteListActions';
import TestSuiteList from './TestSuiteList';

const loadData = props => {
	props.getAllTestSuites();
};

class Startup extends React.Component {

	componentDidMount() {
		loadData(this.props);
	}

	render() {
		return (
			<div className='testSuiteList'>
				<div className='page-header'>
					<h2 className="activityHeading">Data Profiling</h2>
					<div className='project-switch'>
						<Button bsStyle="primary" onClick={ (e) => this.props.handleSwitchProject(true)}>Switch Project</Button> 
					</div>
				</div>
				<TestSuiteList />
			</div>
		);
	 }
}

const mapDispatchToProps = dispatch => ({
	getAllTestSuites: () => dispatch(getAllTestSuites()),
	showProjectSwitchPage: (data) => dispatch(showProjectSwitchPage(data))
})

export default connect(
	null,
	mapDispatchToProps
) (Startup);
