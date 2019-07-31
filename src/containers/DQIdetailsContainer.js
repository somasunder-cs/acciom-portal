import React, { Component } from 'react';
import { connect } from 'react-redux';
import GaugeChart from '../components/GaugeChart';
import BarChart from '../components/BarChart';
import { getDQIprojectDetails } from '../actions/dashboardActions'; 

class DQIDetailsContainer extends Component {

	componentDidMount() {
		console.log('Dashboard.componentDidMount() ===>', this.props);
		this.props.getDQIprojectDetails(this.props.id);
	}


	render() {
		console.log("detailContainer", this.props.projectDataQuality);

		const colorsArray = [
			['#99cc00'],
			['#cc00cc'],
			['#ff9933'],
			['#9933ff'],
			['#cc6600']
		];

		const getGaugeChart = () => {
			console.log("getGaugeChart", this.props);
			if (this.props.projectDataQuality && this.props.projectDataQuality.project_name) {
				return (<GaugeChart class={'DQIprojectGauge'} name={"DQI"} percentage={this.props.projectDataQuality.project_dqi_percentage} />) 
			}
		};
		const getDPIdetailsChart = () => {
			let chartList = [];
			if (this.props.projectDataQuality && this.props.projectDataQuality.project_name) {
					chartList =  this.props.projectDataQuality.project_dqi_detail.map(function(item, index){
						return (<li key={ index }><GaugeChart name={item.name} class={'DQIprojectGaugeDetail'} percentage={item.value} width={250} color={colorsArray[index]}/></li>);
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
	console.log("DQIDetailsContainer.state==>", state);
	return {
		projectDataQuality: state.dashboardData.projectDataQuality
	};
};

const mapDispatchToProps = dispatch => ({
	getDQIprojectDetails: () => dispatch(getDQIprojectDetails())
})

export default connect(mapStateToProps, mapDispatchToProps)(DQIDetailsContainer);
