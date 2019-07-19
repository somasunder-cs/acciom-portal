import React from 'react';
import ReactDOM from 'react-dom';
import CardContainer from './CardContainers';
import TimeLineComponent from './Timeline'

class Dashboard extends React.Component {
	render() {
		return (
			<div>
				<CardContainer />
				<TimeLineComponent />
			</div>
		)
	}
}

export default Dashboard;
