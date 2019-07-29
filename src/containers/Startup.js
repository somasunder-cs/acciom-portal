import React from 'react';
import { connect  } from 'react-redux';
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
			<div>
				<h2 className="activityHeading">Test Suite List</h2><br></br>
				<TestSuiteList />
			</div>
		);
	 }
}

const mapDispatchToProps = dispatch => ({
	getAllTestSuites: () => dispatch(getAllTestSuites())
})

export default connect(
	null,
	mapDispatchToProps
) (Startup);
