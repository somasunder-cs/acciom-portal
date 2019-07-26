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
    return (

      <div className="donut">
          <div className="row projectChart">
            <div className="DQIprojectdetailsHeading">Project Name:</div>
              <GaugeChart item={this.props.projectDataQuality}/>
          </div>
          <div className="row detailsChart">
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
