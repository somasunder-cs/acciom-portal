import React from 'react';
import { Route, BrowserRouter as Router  } from 'react-router-dom';
import styled from 'styled-components';

import Startup from '../containers/Startup';
import Home from '../containers/Home';
import Dashboard from '../containers/Dashboard';
import NavigationBar from '../containers/NavigationBar';
import Login from '../containers/Login';
import DQIDetailsContainer from '../containers/DQIdetailsContainer';
import ViewDbDetails from '../containers/ViewDbDetails';
import AddDbDetails from '../containers/AddDbDetails';
import ForgotPassword from './ForgotPassword';
import Token from './token';
import ChangePassword from './ChangePassword';

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

const App = () => (
	<RootContainer>
		<Router>
			<Sidebar>
				<NavigationBar />
			</Sidebar>
			<Content>
				<Route path="/" exact component={Dashboard} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/startup" component={Startup} />
				<Route path="/home" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/dqi_details/:id"  exact component={DQIDetailsContainer} />
				<Route path="/add_db_details" component={AddDbDetails} />
				<Route path="/view_db_details" component={ViewDbDetails} />
				<Route path="/forgot_password" component={ForgotPassword} />
				<Route path="/change_password" component={ChangePassword} />
				<Route path="/access_token" component={Token} />
			</Content>
		</Router>
	</RootContainer>
);

export default App;
