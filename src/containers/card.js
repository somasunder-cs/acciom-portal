import React from 'react';
import '../css/card.css';


function Cards () {
    return (
        <div>
            <div className="row tile_count">
				<div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count cardBox">
					<span className="count_top">
						<i className="far fa-calendar-alt fa-5x" aria-hidden="true"></i> 
						<span className="count">72</span>
						<span>Projects</span>
					</span>
				</div>
				<div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count cardBox">
					<span className="count_top">
						<i className="fas fa-chart-bar fa-5x" aria-hidden="true"></i> 
						<span className="count">12</span>
						<span>Scheduled Runs</span>
					</span>
				</div>
				<div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count cardBox">
					<span className="count_top">
						<i className="fas fa-user-friends fa-5x" aria-hidden="true"></i> 
						<span className="count">272</span>
						<span>Users</span>
					</span>
				</div>
			</div>
        </div>
    );
}   

export default Cards;