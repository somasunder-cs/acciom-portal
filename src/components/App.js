import React from 'react';
import { Route, BrowserRouter as Router  } from 'react-router-dom';
import styled from 'styled-components';

import Startup from '../containers/Startup';
import Home from '../containers/Home';
import Dashboard from '../containers/Dashboard';
import NavigationBar from '../containers/NavigationBar';
import Login from '../containers/Login';

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
				<Route path="/startup" component={Startup} />
				<Route path="/home" component={Home} />
				<Route path="/login" component={Login} />
			</Content>
		</Router>
	</RootContainer>
);

export default App;
