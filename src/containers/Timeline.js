import React, {Component} from 'react';


class TimeLineComponent extends Component {
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
  render() {
    return (
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="x_panel">
                <div className="x_title">
                  <h2 className="activityHeading">Recent Activities <small>Sessions</small></h2>
                  <ul className="nav navbar-right panel_toolbox">
                    <li>
                      <a className="collapse-link">
                        {this.state.open ? (<i className="fa fa-chevron-up" onClick={(e)=>this.togglePanel(e)}></i>) : (<i className="fa fa-chevron-down" onClick={(e)=>this.togglePanel(e)}></i>)}
                      </a>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                      <ul className="dropdown-menu" role="menu">
                      </ul>
                    </li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
                { this.state.open ?  (<div className="x_content">
                  <div className="dashboard-widget-content">

                    <ul className="list-unstyled timeline widget">
                      <li>
                        <div className="block">
                          <div className="block_content">
                            <h2 className="title">
                                              <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                          </h2>
                            <div className="byline">
                              <span>13 hours ago</span> by <a>Jane Smith</a>
                            </div>
                            <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="block">
                          <div className="block_content">
                            <h2 className="title">
                                              <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                          </h2>
                            <div className="byline">
                              <span>13 hours ago</span> by <a>Jane Smith</a>
                            </div>
                            <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="block">
                          <div className="block_content">
                            <h2 className="title">
                                              <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                          </h2>
                            <div className="byline">
                              <span>13 hours ago</span> by <a>Jane Smith</a>
                            </div>
                            <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="block">
                          <div className="block_content">
                            <h2 className="title">
                                              <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                          </h2>
                            <div className="byline">
                              <span>13 hours ago</span> by <a>Jane Smith</a>
                            </div>
                            <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>) : null}
              </div>
            </div>
    )
  }
}

export default TimeLineComponent;