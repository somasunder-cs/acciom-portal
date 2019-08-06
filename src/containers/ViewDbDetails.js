import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Panel, Table, Button} from 'react-bootstrap';

import { getAllDBDetails, getDBDetailsById } from '../actions/dbDetailsActions';

class ViewDbDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isOrganisationInitialised: false
		};
	}	

	static getDerivedStateFromProps = (nextProps, prevState) => {
		if (!prevState.isOrganisationInitialised && 
			nextProps.isOrganisationInitialised > 0) {
			nextProps.getAllDBDetails();
		}
		return ({
			isOrganisationInitialised: nextProps.isOrganisationInitialised
		});
	}

	handleInputChange = ({target}) => {
		const { value, name } = target;

		const { formData } = this.state;
		formData[name] = value;

		this.setState({
			formData
		});
	}

	// onEditDbListItem = (item) => {
	// 	console.log('onEditDbListItem ', item.db_type_id);
	// 	this.props.getDBDetailsById(item.db_type_id);
	// }

	renderDBDetailsList = (dbDetailsList) => {
		return dbDetailsList.map((item, index) => {
			return (
				<tr key={index}>
					<td>{item.project_name}</td>
					<td>{item.connection_name}</td>
					<td>{item.db_type_name}</td>
					<td>{item.db_name}</td>
					<td>{item.db_hostname}</td>
					<td>{item.db_username}</td>
					<td>
						<Link to={`/add_db_details/${item.db_type_id}`}>
						  <label className="addDBDetails">Edit Connection</label>
						</Link>
					</td>
					{/* <td>
					     <label>Test Connection</label>
					</td> */}
				</tr>	
			);
		});
	};

	render() {
 		return (
			 
			<div className="viewDbDetailsForm">
				<div className='btnContainer'>
					<Link to={`/add_db_details`}>
						<Button className="addDbBtn" type="button" bsStyle="primary"> Add DB Details </Button>
					</Link>
				</div>
				<Panel>
					<Panel.Heading>Manage DB Connections</Panel.Heading>
					<Panel.Body>
						<Table responsive>
							<thead>
								<tr>
									<th>Project Name</th>
									<th>Connection Name</th>
									<th>Database Type</th>
									<th>Database Name</th>
									<th>Host Name</th>
									<th>User Name</th>
								</tr>
							</thead>
							<tbody>
								{ this.renderDBDetailsList(this.props.dbDetailsList) }
							</tbody>
						</Table>
					</Panel.Body>
				</Panel>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		dbDetailsList: state.dbDetailsData.dbDetailsList?state.dbDetailsData.dbDetailsList: [],
		isOrganisationInitialised: state.appData.isOrganisationInitialised
	};
};

const mapDispatchToProps = dispatch => ({
	getAllDBDetails: () => dispatch(getAllDBDetails())
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewDbDetails);