import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class GaugeChart extends Component {
  
  constructor(props) {
    super(props);
    console.log("gaugeChartValue", this.props);
    this.options = {
        chart: {
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '97%',
                    margin: 5, // margin is in pixels
                    shadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#999',
                        opacity: 1,
                        blur: 2
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },   
                    value: {
                        offsetY: 15,
                        fontSize: '22px'
                    }                     
                }
            }
        },
        fill: {
            type: 'solid',
        },
        series: [86],
        labels: ['Average Results'],
       
    }
  }

  render() {

    return (

      <div className="donut">  
        <Chart options={this.options} series={this.options.series} type="radialBar" width="300" />
      </div>
    );
  }
}

export default GaugeChart;
