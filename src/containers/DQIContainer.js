import React, { Component } from 'react';
import { connect } from 'react-redux';
import DonutChart from '../components/DonutChart';

class DQIContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			open: true
		}
		this.togglePanel = this.togglePanel.bind(this);
	}

	togglePanel(e){
		this.setState({open: !this.state.open})
	}

	render () {

		this.colorsArray = [
			['#99cc00', '#cc9900'],
			['#cc00cc', '#ffddff'],
			['#131386', '#ff00dd'],
			['#0000ff', '#ff00aa'],
		];

		this.getDonutCharts = () => {
			let chartList = [];
			if (this.props.orgDataQuality && this.props.orgDataQuality.projects) {
				chartList =  this.props.orgDataQuality.projects.map((item, index) => {
					return (<li key={ index }><DonutChart chartindex={index} chartData={item} colors={this.colorsArray[index]}/></li>);
				});
			}
			return chartList;
		};

		return (
			<div className="col-md-8 col-sm-8 col-xs-12">
				<div className="x_panel tile overflow_hidden">
					<div className="x_title">
						<h2 className="chartHeading">Data Quality</h2>
						<ul className="nav navbar-right panel_toolbox">
							<li><a className="collapse-link">
									{this.state.open ? (<i className="fa fa-chevron-up" onClick={(e)=>this.togglePanel(e)}></i>) : (<i className="fa fa-chevron-down" onClick={(e)=>this.togglePanel(e)}></i>)}
								</a>
							</li>
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
								<ul className="dropdown-menu" role="menu">
									<li><a href="#">Settings 1</a>
									</li>
									<li><a href="#">Settings 2</a>
									</li>
								</ul>
							</li>
						</ul>
						<div className="clearfix"></div>
						{this.state.open ? (<ul className="donutContent">{this.getDonutCharts()}</ul>) : null}
					</div>
				</div>
				
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		orgDataQuality: state.dashboardData.orgDataQuality
	};
};

export default connect(mapStateToProps)(DQIContainer);