import React from 'react';
import { connect  } from 'react-redux';
import { getOrgDataQuality } from '../actions/dashboardActions';
import ProjectChartList from '../containers/ProjectListChartContainer';
import DQIDetailsContainer from '../containers/DQIdetailsContainer';

class Dashboard extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	componentDidMount() {
		if (this.props.currentOrg) {
			this.props.getOrgDataQuality(this.props.currentOrg.org_id);
		}
	}

	static getDerivedStateFromProps = (nextProps) => {
		if (nextProps.refreshDashBoard) {
			nextProps.getOrgDataQuality(nextProps.currentOrg.org_id);
		}
		return null;
	};

	render() {
		return (
			<div>
				<ProjectChartList />
				<DQIDetailsContainer id={1}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentOrg: state.appData.currentOrg,
		refreshDashBoard: state.dashboardData.refreshDashBoard
	};
};

const mapDispatchToProps = dispatch => ({
	getOrgDataQuality: (data) => dispatch(getOrgDataQuality(data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
) (Dashboard);