import React from 'react';
import { connect  } from 'react-redux';
import { getAllTestSuites } from '../middleware';
import TestSuiteList from './TestSuiteList';

const loadData = props => {
	console.log('Startup.loadData() ==>', props);
	props.getAllTestSuites();
}

class Startup extends React.Component {

	componentDidMount() {
		console.log('Startup.componentDidMount() ===>');
		loadData(this.props);
	}

	render() {
		console.log('Startup.render() ==> ', this.props);
		return (
			<div>
				<h1>Start up...</h1>
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
