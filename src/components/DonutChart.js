import React, { Component } from "react";
import Chart from "react-apexcharts";

class DonutChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options : {
        series: [44, 55, 13, 33],
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
        chart: {
            type: 'donut'
        }
      }
    };
  }

  render() {
    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.options.series} type="donut" width="300" />
      </div>
    );
  }
}

export default DonutChart;