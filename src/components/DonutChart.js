import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import DQIDetailsComponent from './DQIProjectDetails';
import {browserHistory} from 'react-router'

import Chart from 'react-apexcharts'

class DonutChart extends Component {

  constructor(props) {
    super(props);
    const me = this;
    this.state = {
      optionsRadial: {
        fill: {
          type: 'solid',
          colors: props.colors
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
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
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
                offsetY: -20,
                show: true,
                color: "#888",
                fontSize: "13px"
              },
              value: {
                formatter: function(val) {
                  return val;
                },
                color: "#111",
                fontSize: "30px",
                show: true
              }
            }
          }
        },
        labels: [''],

      },
      seriesRadial: [props.chartData.project_dqi_percentage]
    }
  }

  render() {

    return (

      <div className="donut">
        <Link to={`/dqi_details`}>
          <Chart options={this.state.optionsRadial} series={this.state.seriesRadial} colors={this.state.optionsRadial.colors} type="radialBar" width="280" />
        </Link>
        <span className="chartProjectName">{this.props.chartData.project_name}</span>
      </div>
    );
  }
}

export default DonutChart;
