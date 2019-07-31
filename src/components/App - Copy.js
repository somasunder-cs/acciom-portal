import React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Redirect  } from 'react-router-dom';
import styled from 'styled-components';

import Startup from '../containers/Startup';
import Home from '../containers/Home';
import Dashboard from '../containers/Dashboard';
import NavigationBar from '../containers/NavigationBar';
import Login from '../containers/Login';
import DQIDetailsContainer from '../containers/DQIdetailsContainer';
import ViewDbDetails from '../containers/ViewDbDetails';
import AddDbDetails from '../containers/AddDbDetails';
import RootContent from '../containers/RootContent';

const RootContainer = styled.div`
	font-size: 2rem;	
`;

const Sidebar = styled.div`
	display: inline-block;
`;

const Content = styled.div`
	display: inline-block;
	position: relative;
	left:100px;
	top: 100px;
	width: -webkit-calc(100% - 250px);
    width:    -moz-calc(100% - 250px);
    width:         calc(100% - 250px);
`;

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => {
		return (
			rest.authTokenExpired === true ?
				<Redirect to='/login' /> : <Component {...props} />
		)}} 
	/>
)
  
const App = (props) => {
	return (
		<RootContainer id="rootContainer">
			<Router>
				<Sidebar>
					<NavigationBar />
				</Sidebar>
				<Content>
					<RootContent></RootContent>
					<Route path="/" exact component={Dashboard} />
					<PrivateRoute path="/dashboard" authTokenExpired={props.authTokenExpired} component={Dashboard} />
					<PrivateRoute path="/startup"  authTokenExpired={props.authTokenExpired} component={Startup} />
					<PrivateRoute path="/home"  authTokenExpired={props.authTokenExpired} component={Home} />
					<Route path="/login" component={Login} />
					<PrivateRoute path="/dqi_details/:id" exact  authTokenExpired={props.authTokenExpired} component={DQIDetailsContainer} />
					<PrivateRoute path="/add_db_details" authTokenExpired={props.authTokenExpired} component={AddDbDetails} />
					<PrivateRoute path="/view_db_details" authTokenExpired={props.authTokenExpired} component={ViewDbDetails}/>
				</Content>
			</Router>
		</RootContainer>
	)
};

const mapStateToProps = (state) => {
	console.log('App.mapStateToProps() state.loginData.authTokenExpired ', state.loginData.authTokenExpired)
	return {
		authTokenExpired: state.loginData.authTokenExpired
	};
};

export default connect(mapStateToProps)(App);
