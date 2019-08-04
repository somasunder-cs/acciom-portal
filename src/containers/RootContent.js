import React, { Component } from "react";
import { connect } from 'react-redux';

import ChangeOrganisation from '../components/ChangeOrganisation';
import { getOrganizationsList } from '../actions/appActions';
import { checkAuthentication } from '../actions/loginActions';

class RootContent extends Component {

	componentDidMount() {
		this.props.checkAuthentication();
		this.props.getOrganizationsList();
	}

	render() {
		return (<div>
			<ChangeOrganisation />
		</div>);
	}
}

const mapDispatchToProps = dispatch => ({
	checkAuthentication: () => dispatch(checkAuthentication()),
	getOrganizationsList: (data) => dispatch(getOrganizationsList(data))
})

export default connect(null, mapDispatchToProps)(RootContent);