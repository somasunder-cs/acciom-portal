import React, { Component } from "react";
import { compose } from 'redux';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ChangeOrganisation from '../components/ChangeOrganisation';
import SwitchProject from '../components/SwitchProject';
import { getOrganizationsList } from '../actions/appActions';
import { checkAuthentication } from '../actions/loginActions';
import 'react-toastify/dist/ReactToastify.css';

class RootContent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			authTokenExpired: false
		};
	}
	
	static getDerivedStateFromProps = (nextProps, prevState) => {
		if (!prevState.authTokenExpired && nextProps.loginData.authTokenExpired) {
			nextProps.history.push('./login');
			return nextProps.loginData;
		}
		return prevState;
	};

	componentDidMount() {
		this.props.checkAuthentication();
		this.props.getOrganizationsList();
	}

	render() {
		return (<div>
			<ToastContainer containerId='generic-toaste' autoClose={4000} />
			
			{ this.props.isOrgChangePageVisible ?
				<ChangeOrganisation />
				: null 
			}

			{ this.props.isProjectSwitchPageVisible ?
				<SwitchProject />
				: null 
			}
		</div>);
	}
}

const mapStateToProps = (state) => {
	return {
		loginData: state.loginData,
		isOrgChangePageVisible: state.appData.isOrgChangePageVisible,
		isProjectSwitchPageVisible: state.appData.isProjectSwitchPageVisible
	};
};

const mapDispatchToProps = dispatch => ({
	checkAuthentication: () => dispatch(checkAuthentication()),
	getOrganizationsList: (data) => dispatch(getOrganizationsList(data))
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter) (RootContent);