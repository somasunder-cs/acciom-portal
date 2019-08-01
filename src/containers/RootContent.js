import React, { Component } from "react";
import { connect } from 'react-redux';

import ChangeOrganisation from '../components/ChangeOrganisation';
import { getOrganizationsList } from '../actions/appActions';
import { checkAuthentication } from '../actions/loginActions';

class RootContent extends Component {

	componentDidMount() {
		console.log('RootContent.componentDidMount ', this.props);
		this.props.checkAuthentication();
		this.props.getOrganizationsList();
	}

	render() {
		return (<div>
			<ChangeOrganisation />
		</div>);
	}
}

const mapStateToProps = (state) => {
	return {
		// loginData: state.loginData
	};
};

const mapDispatchToProps = dispatch => ({
	checkAuthentication: () => dispatch(checkAuthentication()),
	getOrganizationsList: (data) => dispatch(getOrganizationsList(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContent);