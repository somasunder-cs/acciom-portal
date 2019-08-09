import React, { Component } from "react";
import { compose } from 'redux';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ChangeOrganisation from '../components/ChangeOrganisation';
import SwitchProject from '../components/SwitchProject';
import { getOrganizationsList, redirectToLoginPageComplete } from '../actions/appActions';
import { checkAuthentication } from '../actions/loginActions';

class RootContent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			authTokenExpired: false
		};
	}
	
	static getDerivedStateFromProps = (nextProps, prevState) => {
		if (nextProps.redirectToLoginPage) {
			nextProps.redirectToLoginPageComplete();
			nextProps.history.push('./login');
		} else if (nextProps.reloadOrgList) {
			nextProps.getOrganizationsList();
		}
		
		return null;
	};

	componentDidMount() {
		this.props.checkAuthentication();
	};

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
	};
}

const mapStateToProps = (state) => {
	return {
		isOrgChangePageVisible: state.appData.isOrgChangePageVisible,
		isProjectSwitchPageVisible: state.appData.isProjectSwitchPageVisible,
		redirectToLoginPage: state.appData.redirectToLoginPage,
		reloadOrgList: state.appData.reloadOrgList
	};
};

const mapDispatchToProps = dispatch => ({
	checkAuthentication: () => dispatch(checkAuthentication()),
	getOrganizationsList: (data) => dispatch(getOrganizationsList(data)),
	redirectToLoginPageComplete: () => dispatch(redirectToLoginPageComplete())
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter) (RootContent);