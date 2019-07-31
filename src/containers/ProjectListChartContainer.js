import React, { Component } from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
import DonutChart from '../components/DonutChart';


class ProjectChartList extends Component {
    
    constructor(props) {
        super(props);
    }

    
    render() {

      this.colorsArray = [
        ['#99cc00', '#cc9900'],
        ['#ffcc00', '#ffddff'],
        ['#009999', '#ff00dd'],
        ['#0000ff', '#ff00aa'],
      ];
  
      this.getDonutCharts = () => {
        let chartList = [];
        if (this.props.orgDataQuality && this.props.orgDataQuality.projects) {
          chartList =  this.props.orgDataQuality.projects.map((item, index) => {
            return (<DonutChart key={ index } chartindex={index} chartData={item} colors={this.colorsArray[index]}/>);
          });
        }
        return chartList;
      };

      const settings = {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1
      };
      return (
        <div className="row projectList">
          <Slider {...settings}>
          {this.getDonutCharts()}
          </Slider>
        </div>
      );
    }
       
    
}

const mapStateToProps = state => {
	return {
		orgDataQuality: state.dashboardData.orgDataQuality
	};
};

export default connect(mapStateToProps)(ProjectChartList);
