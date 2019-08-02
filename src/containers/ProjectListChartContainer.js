import React, { Component } from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
import DonutChart from '../components/DonutChart';


class ProjectChartList extends Component {
    
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next() {
      this.slider.slickNext();
    }
    previous() {
      this.slider.slickPrev();
    }

    
    render() {

      this.colorsArray = [
        ['#99cc00', '#cc9900'],
        ['#ffcc00', '#ffddff'],
        ['#009999', '#ff00dd'],
        ['#0000ff', '#ff00aa'],
      ];
  
      this.getDonutCharts = () => {
        console.log("organization api details", this.props)
        let chartList = [];

        chartList =  this.props.projects.map((item, index) => {
          console.log(item, "===",index)
          return (<DonutChart key={ index } chartindex={index} chartData={item} colors={this.colorsArray[index]}/>);
        });
       
        if (this.props.projects.length <= 4 ) {
          return chartList;
        } else {
          return (
            <div>
              <i className="previousArrow fas fa-arrow-circle-left fa-2x" style={{color: 'green'}} onClick={this.previous}></i>
              <Slider ref={c => (this.slider = c)} {...settings}>
                { chartList }
              </Slider>
              <i className="nextArrow fas fa-arrow-circle-right fa-2x" style={{color: 'green'}} onClick={this.next}></i>
             </div>
          )
        }
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
            {this.getDonutCharts()}
        </div>
      );
    }
       
    
}

const mapStateToProps = state => {
  console.log('ProjListChart.mapStateToProps() ===>', state);
	return {
		projects: state.dashboardData.orgDataQuality && state.dashboardData.orgDataQuality.projects?state.dashboardData.orgDataQuality.projects: []
	};
};


export default connect(mapStateToProps)(ProjectChartList);
