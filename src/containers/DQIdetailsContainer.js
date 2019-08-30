import React, { Component } from 'react';
import { connect } from 'react-redux';
import GaugeChart from '../components/GaugeChart';
import BarChart from '../components/BarChart';
import { getDQIprojectDetails } from '../actions/dashboardActions'; 

class DQIDetailsContainer extends Component {

	render() {

		const colorsArray = [
			['#49a9ea'],
			['#36CAAB'],
			['#B370CF'],
			['#FFFFFF'],
			['#34495E']
		];

		const getGaugeChart = () => {
			if (this.props.projectDataQuality && this.props.projectDataQuality.project_name) {
				return (<GaugeChart class={'DQIprojectGauge'} name={"DQI"} percentage={this.props.projectDataQuality.project_dqi_percentage} />) 
			}
		};

		const getDPIdetailsChart = () => {
			let chartList = [];
			if (this.props.projectDataQuality && this.props.projectDataQuality.project_name) {
				chartList =  this.props.projectDataQuality.project_dqi_detail.map((item, index) => {
					return (<li key={ index }><GaugeChart name={item.name} class={'DQIprojectGaugeDetail'} percentage={item.value} width={300} color={colorsArray[index]}/></li>);
				})
				return chartList; 
			}
		}

		return (
			<div className="donut DQIprojectChartContainer">
				<div className="row detailsChart">
					{getDPIdetailsChart()}
				</div>
				<div className="row">
					<BarChart />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		projectDataQuality: state.dashboardData.projectDataQuality,
		currentProject: state.appData.currentProject
	};
};

const mapDispatchToProps = dispatch => ({
	getDQIprojectDetails: (data) => dispatch(getDQIprojectDetails(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(DQIDetailsContainer);
