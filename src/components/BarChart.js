import React, { Component } from 'react';


import Chart from 'react-apexcharts'

class BarChart extends Component {
  
  constructor(props) {
    super(props);
  }

  
  render() {

    const options = {
        chart: {
          height: 50,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        series: [{
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    }
  

    return (

      <div className="bar">
        <Chart options={options} series={options.series}  width="1000" height="200px"/>
      </div>
    );
  }
}

export default BarChart;
