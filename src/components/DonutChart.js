import React, { Component } from "react";
import Chart from "react-apexcharts";

class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.charatData = {
      options : {
        series: [props.chartData.project_dqi_percentage, (100 - props.chartData.project_dqi_percentage) ],
        labels: ['DPI1', 'DPI2'],
        colors:[function({ value, seriesIndex, w }) {
          if(value < 55) {
              return '#f20d0d'
          } else if (value >= 55 && value < 80) {
              return '#ff0000'
          } else {
              return '#0d00f2'
          }
        }],
        legend: {
          show: false
        }
      }
    };
  }

  render() {
    return (
      <div className="donut">
        <Chart options={this.charatData.options} series={this.charatData.options.series} type="donut" width="200" colors={this.charatData.options.colors} />
        <span className="chartProjectName">{this.props.chartData.project_name}</span>
      </div>
    );
  }
}

export default DonutChart;