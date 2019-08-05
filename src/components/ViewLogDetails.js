import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import { 
	ICON_STATUS_SUCCESS, 
	ICON_STATUS_FAIL, 
	ICON_STATUS_ERROR, 
	ICON_STATUS_INPROGRESS 
} from '../constants/icons';

import {
	COUNT_CHECK, NULL_CHECK, DUPLICATE_CHECK,	DDL_CHECK, DATA_VALIDATION,
	NEW, PASS, FAIL, ERROR, INPROGRESS
} from '../constants/common';

export const renderStatusLabel = (status) => {
	let labelColor = '';
	let  label = '';
	switch(status) {
	case 0:
	case NEW:
		labelColor = 'blue';
		label = 'New';
		break;
	case 1:
	case PASS:	
		labelColor = 'green';
		label = 'Pass';
		break;
	case 2:
	case FAIL:
		labelColor = 'red';
		label = 'Fail';
		break;

	case 3:
	case INPROGRESS:
		labelColor = '#f3a563';
		label = 'In Progress';
		break;
	
	case 4:
	case ERROR:
		labelColor = 'red';
		label = 'Error';
		break;

	default:
		break;
	}
	return <label style={{ color: labelColor }}>{label}</label>;
};

export const renderStatusIcon = (status) => {
	let iconClassName = '';
	switch(status) {
	case NEW:
	case 0:
		return 'New';
		// return <img alt={status} src={icon_new} />;

	case PASS:
	case 1:
		iconClassName = ICON_STATUS_SUCCESS;
		break;
	
	case FAIL:
	case 2:
		iconClassName = ICON_STATUS_FAIL;
		break;

	case ERROR:
	case 3:
		iconClassName = ICON_STATUS_ERROR;
		break;
	
	case INPROGRESS:
	case 4:
		iconClassName = ICON_STATUS_INPROGRESS;
		break;

	default:
	}

	return <i className={iconClassName} aria-hidden="true"></i>;
};

class CaseLogDetails extends React.Component {

	handleMessage = (status, name) => {
		let message = null;
		if (status === PASS) {
			if (name === COUNT_CHECK) {
				message = 'Source and Target Records Count Matches.';
			} else if (name === DUPLICATE_CHECK) {
				message = 'No Duplicate rows found in Target Table.';
			} else if (name === NULL_CHECK) {
				message = 'No Null values found in Target Table.';
			} else if (name === DDL_CHECK || name === DATA_VALIDATION) {
				message = 'Source and Target Schema are Same.';
			}
		} else {
			if (name === COUNT_CHECK) {
				message = 'Source and Target Records Count do not Match.';
			} else if (name === DUPLICATE_CHECK) {
				message = 'Duplicate rows found in Target Table.';
			} else if (name === NULL_CHECK) {
				message = 'Null values found in Target Table.';
			} else if (name === DDL_CHECK || name === DATA_VALIDATION) {
				message = 'Source and Target Schema do not Match.';
			}
		}
		return message;
	};

	render() {
		return (
			<div>
				{ this.props.testCaseName == 'countcheck' ?
					// CountCheck
					<Table id="viewLogDetails">
						<tbody>
							<tr>
								<td className="testCaseLogLabel">
									<label className="testViewDataLabel">{this.props.testCaseName} </label>
								</td>
							</tr>
							<tr>
								<td className="testCaseLogLabel">
									<label className="testViewDataLabel">Result: </label>&nbsp;&nbsp;
									<label className="resultLog">
										{renderStatusLabel(this.props.TestCaseLogDetails.Execution_status)}
									</label>&nbsp;&nbsp;
									{ renderStatusIcon(this.props.TestCaseLogDetails.Execution_status) }
								</td>
							</tr>
							<tr>
								<td className="testCaseLogMessage">
									<label className="testViewDataLabel">
										{this.handleMessage(this.props.TestCaseLogDetails.Execution_status, this.props.testCaseName)} 
									</label>
								</td>
							</tr>
							<tr>
								<Table striped bordered hover size="sm" className="executionLog">
									<tr>
										<td className="testCaseLogLabel">
											<label className="testViewDataLabel">Source Table Execution</label>
										</td>
										<td className="testCaseLogLabel">
											<label className="testViewDataLabel">Target Table Execution</label>
										</td>
									</tr>
									<tr>
										<td className="testCaseLogLabel">
											{ this.props.TestCaseLogDetails.Execution_log ?
												<label className="testViewExecution">{this.props.TestCaseLogDetails.Execution_log['source_execution_log']}</label>
												:
												null
											}
										</td>
										<td className="testCaseLogLabel">
											{ this.props.TestCaseLogDetails.Execution_log ?
												<label className="testViewExecution">{this.props.TestCaseLogDetails.Execution_log['dest_execution_log']}</label>
												:
												null
											}
										</td>
									</tr>
								</Table>
							</tr>
						</tbody>
					</Table>
					: 
					this.props.testCaseName == 'duplicatecheck' ?
						// DuplicateCheck
						<Table id="viewLogDetails">
							<tbody>
								<tr>
									<td className="testCaseLogLabel">
										<label className="testViewDataLabel">{this.props.testCaseName} </label>
									</td>
								</tr>
								<tr>
									<td className="testCaseLogLabel">
										<label className="testViewDataLabel">Result: </label>&nbsp;&nbsp;
										<label className="resultLog">
											{renderStatusLabel(this.props.TestCaseLogDetails.Execution_status)}
										</label>&nbsp;&nbsp;
										{ renderStatusIcon(this.props.TestCaseLogDetails.Execution_status) }
									</td>
								</tr>
								<tr>
									<td className="testCaseLogMessage">
										
											<label className="testViewDataLabel">
												{ this.props.TestCaseLogDetails.Execution_log ?
													<span className="red">{this.props.TestCaseLogDetails.Execution_log['Duplicate_count']}&nbsp;</span>
													: null
												}
												{this.handleMessage(this.props.TestCaseLogDetails.Execution_status, this.props.testCaseName)} 
											</label>
											
									</td>
								</tr>
								{ this.props.TestCaseLogDetails.Execution_log && this.props.TestCaseLogDetails.Execution_log['dest_execution_log'].length > 0 ?
								<tr>
									<Table striped bordered hover size="sm" className="executionLog">
										{
											this.props.TestCaseLogDetails.Execution_log['dest_execution_log'].map(log => (
											<tr>
												{log.map(details => (
													<td className="testCaseLogLabel">
														<label className="testViewDataLabel">{details}</label>
													</td>
												))}
											</tr>
											))
										}
									</Table>
									</tr>
								: null }
							</tbody>
						</Table>

						// NullCheck
						: this.props.testCaseName == 'nullcheck' ?
						<Table id="viewLogDetails">
							<tbody>
								<tr>
									<td className="testCaseLogLabel">
										<label className="testViewDataLabel">{this.props.testCaseName} </label>
									</td>
								</tr>
								<tr>
									<td className="testCaseLogLabel">
										<label className="testViewDataLabel">Result: </label>&nbsp;&nbsp;
										<label className="resultLog">
											{renderStatusLabel(this.props.TestCaseLogDetails.Execution_status)}
										</label>&nbsp;&nbsp;
										{ renderStatusIcon(this.props.TestCaseLogDetails.Execution_status) }
									</td>
								</tr>
								<tr>
									<td className="testCaseLogMessage">
										<label className="testViewDataLabel">
											{ this.props.TestCaseLogDetails.Execution_log ?
												<span className="red">{this.props.TestCaseLogDetails.Execution_log['Null_count']} &nbsp;</span>
											: null }
											{this.handleMessage(this.props.TestCaseLogDetails.Execution_status, this.props.testCaseName)} 
										</label>
									</td>
								</tr>
								{this.props.TestCaseLogDetails.Execution_log && this.props.TestCaseLogDetails.Execution_log['dest_log'].length > 0 ?
								<tr>
									<Table striped bordered hover size="sm" className="executionLog">
									{this.props.TestCaseLogDetails.Execution_log['dest_log'].map(log => (
										<tr>
											{log.map(details => (
												<td className="testCaseLogLabel">
													<label className="testViewDataLabel">{details}</label>
												</td>
											))}	
										</tr>
									))}
									</Table>
								</tr>
								: null }
							</tbody>
						</Table> : 

						// DDL Check
						this.props.testCaseName == 'ddlcheck' ?
						<Table id="viewLogDetails">
							<tbody>
								<tr>
									<td className="testCaseLogLabel">
										<label className="testViewDataLabel">{this.props.testCaseName} </label>
									</td>
								</tr>
								<tr>
									<td className="testCaseLogLabel">
										<label className="testViewDataLabel">Result: </label>&nbsp;&nbsp;
										<label className="resultLog">
											{renderStatusLabel(this.props.TestCaseLogDetails.Execution_status)}
										</label>&nbsp;&nbsp;
										{ renderStatusIcon(this.props.TestCaseLogDetails.Execution_status) }
									</td>
								</tr>
								<tr>
									<td className="testCaseLogMessage">
										<label className="testViewDataLabel">
											{this.handleMessage(this.props.TestCaseLogDetails.Execution_status, this.props.testCaseName)} 
										</label>
									</td>
								</tr>
							</tbody>
						</Table>
						: this.props.testCaseName == 'datavalidation' ?
						// Datavalidation
						<Table id="viewLogDetails">
							<tbody>
								<tr>
									<td className="testCaseLogLabel">
										<label className="testViewDataLabel">{this.props.testCaseName} </label>
									</td>
								</tr>
								<tr>
									<td className="testCaseLogLabel">
										<label className="testViewDataLabel">Result: </label>&nbsp;&nbsp;
										<label className="resultLog">
											{renderStatusLabel(this.props.TestCaseLogDetails.Execution_status)}
										</label>&nbsp;&nbsp;
										{ renderStatusIcon(this.props.TestCaseLogDetails.Execution_status) }
									</td>
								</tr>
								<tr>
									<td className="testCaseLogMessage">
										<label className="testViewDataLabel">
											{this.handleMessage(this.props.TestCaseLogDetails.Execution_status, this.props.testCaseName)} 
										</label>
									</td>
								</tr>
								<tr>
									<td className="testCaseLogMessage">
										<label className="testViewDataLabel">
											Source Count : 
											{ this.props.TestCaseLogDetails.Execution_log ?
												<span className="red">{this.props.TestCaseLogDetails.Execution_log['src_count']}</span>
												: null
											} 
										</label>
									</td>
								</tr>
								<tr>
									<td className="testCaseLogMessage">
										<label className="testViewDataLabel">
											Target Count : 
											{ this.props.TestCaseLogDetails.Execution_log ?
												<span className="red">{this.props.TestCaseLogDetails.Execution_log['dest_count']}</span> 
												: null
											}
										</label>
									</td>
								</tr>

								<tr>
									<td className="testCaseLogMessage">
										<label className="testViewDataLabel">
											Number of Mismatch Records found in Source : <span className="red">{this.props.TestCaseLogDetails.Execution_log['src_to_dest_count']}</span> 
										</label>
									</td>
								</tr>

								<tr>
									<td className="testCaseLogMessage">
										<label className="testViewDataLabel">
											Number of Mismatch Records found in Target : <span className="red">{this.props.TestCaseLogDetails.Execution_log['dest_to_src_count']}</span> 
										</label>
									</td>
								</tr>
							</tbody>
						</Table> 
						: 'No Logs Found!' }
				</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		testCaseName: state.testSuites.testCaseLog.testCaseName,
		TestCaseLogDetails: state.testSuites.testCaseLog.logData 
	};
};

export default connect(mapStateToProps)(CaseLogDetails);