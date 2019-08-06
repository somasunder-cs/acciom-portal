import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDQIprojectDetails } from '../actions/dashboardActions';

import Chart from 'react-apexcharts';

class DonutChart extends Component {
	constructor(props) {
		super(props);
		this.options = {
			optionsRadial: {
				fill: {
					type: 'solid',
					colors: props.colors
				},
				chart : {
					events: {
						click : (event, chartContext, config) => {
							props.getDQIprojectDetails(props.chartData.project_id);
						}
					}
				},
				plotOptions: {
					radialBar: {
						hollow: {
							margin: 0,
							size: "70%",
							background: "#fff",
							image: undefined,
							imageOffsetX: 0,
							imageOffsetY: 0,
							position: "front",
							dropShadow: {
								enabled: true,
								top: 3,
								left: 0,
								blur: 4,
								opacity: 0.24
							}
						},
						track: {
							background: "#fff",
							strokeWidth: "70%",
							margin: -7, // margin is in pixels
							dropShadow: {
								enabled: true,
								top: -3,
								left: 0,
								blur: 4,
								opacity: 0.35
							}
						},

						dataLabels: {
							showOn: "always",
							name: {
								offsetY: -40,
								show: true,
								color: "#888",
								fontSize: "13px"
							},
							value: {
								formatter: (val) => {
									return val + '%';
								},
								color: "#111",
								fontSize: "18px",
								show: true
							}
						}
					}
				},
				labels: ['']
			},
			seriesRadial: [props.chartData.project_dqi_percentage.toFixed(2)],
		}
	}

	render() {

		return (
			<div className="donut">
				<Chart options={this.options.optionsRadial} series={this.options.seriesRadial} colors={this.options.optionsRadial.colors} type="radialBar" width="250" />
				<div className="chartLabel">DQI</div>
				<span className="chartProjectName">{this.props.chartData.project_name}</span>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	getDQIprojectDetails: (data) => dispatch(getDQIprojectDetails(data))
});

export default connect(null, mapDispatchToProps)(DonutChart);

