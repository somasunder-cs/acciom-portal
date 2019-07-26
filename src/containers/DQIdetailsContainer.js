import React, { Component } from 'react';
import { connect } from 'react-redux';
import GaugeChart from '../components/GaugeChart';
import { getDQIprojectDetails } from '../middleware' 

class DQIDetailsContainer extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Dashboard.componentDidMount() ===>', this.props);
    this.props.getDQIprojectDetails(this.props.match.params.id);
  }


  render() {
    console.log("detailContainer", this.props.projectDataQuality);
    
    const getGaugeChart = () => {
      console.log("getGaugeChart", this.props);
      if (this.props.projectDataQuality && this.props.projectDataQuality.project_name) {
        return (<GaugeChart name={this.props.projectDataQuality.project_name} percentage={this.props.projectDataQuality.project_dqi_percentage} />) 
      }
    };
    const getDPIdetailsChart = () => {
      if (this.props.projectDataQuality && this.props.projectDataQuality.project_name) {
        return (
          <div className="detailsChart">
            <GaugeChart name={this.props.projectDataQuality.project_dqi_detail[0].name} percentage={this.props.projectDataQuality.project_dqi_detail[0].value} width={250} color={'#99cc00'}/>
            <GaugeChart name={this.props.projectDataQuality.project_dqi_detail[1].name} percentage={this.props.projectDataQuality.project_dqi_detail[1].value} width={250} color={'#cc00cc'}/>
            <GaugeChart name={this.props.projectDataQuality.project_dqi_detail[2].name} percentage={this.props.projectDataQuality.project_dqi_detail[2].value} width={250} color={'#131386'}/>
            <GaugeChart name={this.props.projectDataQuality.project_dqi_detail[3].name} percentage={this.props.projectDataQuality.project_dqi_detail[3].value} width={250} color={'#99cc00'}/>
            <GaugeChart name={this.props.projectDataQuality.project_dqi_detail[4].name} percentage={this.props.projectDataQuality.project_dqi_detail[4].value} width={250} color={'#0000ff'}/>
          </div>
        ) 
      }
    }

    return (

      <div className="donut">
          <div className="row projectChart">
            <div className="DQIprojectdetailsHeading">Project Name: {this.props.projectDataQuality.project_name}</div>
            { getGaugeChart() }
          </div>
          <div className="row ">
            {getDPIdetailsChart()}
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
	console.log("DQIContainer.state==>", state);
	return {
		projectDataQuality: state.testSuites.projectDataQuality
	};
};

const mapDispatchToProps = dispatch => ({
	getDQIprojectDetails: () => dispatch(getDQIprojectDetails())
})

export default connect(mapStateToProps, mapDispatchToProps)(DQIDetailsContainer);
