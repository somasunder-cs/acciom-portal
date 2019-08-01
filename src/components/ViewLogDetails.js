import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

class CaseLogDetails extends React.Component {

	handleResult = (status) => {
		let testResult, labelcolor, labelName = null;
			if (status === 'pass') {
				labelcolor = 'green';
				labelName = 'Pass';
			} else {
				labelcolor = 'red';
				labelName = 'Fail';
			}
		
		testResult = <label style={{ color: labelcolor }}>{labelName}</label>;
		return testResult;
	};

	handleIconClass = (status) => {
		let iconClass = null;
			if (status === 'pass') {
				iconClass = 'fas fa-check-circle statusCheckIcon';
			} else {
				iconClass = 'fas fa-times-circle statusDelIcon';
			}
		return iconClass;
	};

	handleMessage = (status, name) => {
		let message = null;
			if (status === 'pass') {
				if (name == 'CountCheck') {
					message = 'Source and Target Records Count Matches.';
				} else if (name == 'DuplicateCheck') {
					message = 'No Duplicate rows found in Target Table.';
				} else if (name == 'NullCheck') {
					message = 'No Null values found in Target Table.';
				} else if (name == 'DDLCheck' || name == 'Datavalidation') {
					message = 'Source and Target Schema are Same.';
				}
			} else {
				if (name == 'CountCheck') {
					message = 'Source and Target Records Count do not Match.';
				} else if (name == 'DuplicateCheck') {
					message = 'Duplicate rows found in Target Table.';
				} else if (name == 'NullCheck') {
					message = 'Null values found in Target Table.';
				} else if (name == 'DDLCheck' || name == 'Datavalidation') {
					message = 'Source and Target Schema do not Match.';
				}
			}			
		return message;
	};

	render() {
		console.log("ViewTestCaseDialogs==>", this.props.TestCase);
		return (
			 <div>
				{ this.props.TestCase.caseName == 'CountCheck' ?
				// CountCheck
			    <Table id="viewLogDetails">
					<tbody>
						<tr>
							<td className="testCaseLogLabel">
								<label className="testViewDataLabel">{this.props.TestCase.caseName} </label>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogLabel">
								<label className="testViewDataLabel">Result: </label>&nbsp;&nbsp;
								  <label className="resultLog">
									{this.handleResult(this.props.TestCaseLogDetails.Execution_status)}
								  </label>&nbsp;&nbsp;
								  <i className={this.handleIconClass(this.props.TestCaseLogDetails.Execution_status)} aria-hidden="true"></i>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogMessage">
								   <label className="testViewDataLabel">
									{this.handleMessage(this.props.TestCaseLogDetails.Execution_status, this.props.TestCase.caseName)} 
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
									<label className="testViewExecution">{this.props.TestCaseLogDetails.Execution_log['source_execution_log']}</label>
								</td>
								<td className="testCaseLogLabel">
									<label className="testViewExecution">{this.props.TestCaseLogDetails.Execution_log['dest_execution_log']}</label>
								</td>
							</tr>
						</Table>
						</tr>
					</tbody>
				</Table>
				: 
				this.props.TestCase.caseName == 'DuplicateCheck' ?
				// DuplicateCheck
			    <Table id="viewLogDetails">
					<tbody>
						<tr>
							<td className="testCaseLogLabel">
								<label className="testViewDataLabel">{this.props.TestCase.caseName} </label>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogLabel">
								<label className="testViewDataLabel">Result: </label>&nbsp;&nbsp;
								  <label className="resultLog">
									{this.handleResult(this.props.TestCaseLogDetails.Execution_status)}
								  </label>&nbsp;&nbsp;
								  <i className={this.handleIconClass(this.props.TestCaseLogDetails.Execution_status)} aria-hidden="true"></i>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogMessage">
								   <label className="testViewDataLabel">
									<span className="red">{this.props.TestCaseLogDetails.Execution_log['Duplicate_count']}</span> {this.handleMessage(this.props.TestCaseLogDetails.Execution_status, this.props.TestCase.caseName)} 
								   </label>
							</td>
						</tr>
						{this.props.TestCaseLogDetails.Execution_log['dest_execution_log'].length > 0 ?							
						 <tr>
							<Table striped bordered hover size="sm" className="executionLog">
							{this.props.TestCaseLogDetails.Execution_log['dest_execution_log'].map(log => (
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
				</Table>
				// NullCheck
				: this.props.TestCase.caseName == 'NullCheck' ?
			    <Table id="viewLogDetails">
					<tbody>
						<tr>
							<td className="testCaseLogLabel">
								<label className="testViewDataLabel">{this.props.TestCase.caseName} </label>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogLabel">
								<label className="testViewDataLabel">Result: </label>&nbsp;&nbsp;
								  <label className="resultLog">
									{this.handleResult(this.props.TestCaseLogDetails.Execution_status)}
								  </label>&nbsp;&nbsp;
								  <i className={this.handleIconClass(this.props.TestCaseLogDetails.Execution_status)} aria-hidden="true"></i>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogMessage">
								   <label className="testViewDataLabel">
								   <span className="red">{this.props.TestCaseLogDetails.Execution_log['Null_count']}</span> {this.handleMessage(this.props.TestCaseLogDetails.Execution_status, this.props.TestCase.caseName)} 
								   </label>
							</td>
						</tr>
						{this.props.TestCaseLogDetails.Execution_log['dest_log'].length > 0 ?							
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
				this.props.TestCase.caseName == 'DDLCheck' ?
			    <Table id="viewLogDetails">
					<tbody>
						<tr>
							<td className="testCaseLogLabel">
								<label className="testViewDataLabel">{this.props.TestCase.caseName} </label>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogLabel">
								<label className="testViewDataLabel">Result: </label>&nbsp;&nbsp;
								  <label className="resultLog">
									{this.handleResult(this.props.TestCaseLogDetails.Execution_status)}
								  </label>&nbsp;&nbsp;
								  <i className={this.handleIconClass(this.props.TestCaseLogDetails.Execution_status)} aria-hidden="true"></i>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogMessage">
								   <label className="testViewDataLabel">
								    {this.handleMessage(this.props.TestCaseLogDetails.Execution_status, this.props.TestCase.caseName)} 
								   </label>
							</td>
						</tr>
					</tbody>
				</Table>
				: this.props.TestCase.caseName == 'Datavalidation' ?
				// Datavalidation
			    <Table id="viewLogDetails">
					<tbody>
						<tr>
							<td className="testCaseLogLabel">
								<label className="testViewDataLabel">{this.props.TestCase.caseName} </label>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogLabel">
								<label className="testViewDataLabel">Result: </label>&nbsp;&nbsp;
								  <label className="resultLog">
									{this.handleResult(this.props.TestCaseLogDetails.Execution_status)}
								  </label>&nbsp;&nbsp;
								  <i className={this.handleIconClass(this.props.TestCaseLogDetails.Execution_status)} aria-hidden="true"></i>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogMessage">
								   <label className="testViewDataLabel">
								    {this.handleMessage(this.props.TestCaseLogDetails.Execution_status, this.props.TestCase.caseName)} 
								   </label>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogMessage">
								   <label className="testViewDataLabel">
								   Source Count : <span className="red">{this.props.TestCaseLogDetails.Execution_log['src_count']}</span> 
								   </label>
							</td>
						</tr>
						<tr>
							<td className="testCaseLogMessage">
								   <label className="testViewDataLabel">
								   Target Count : <span className="red">{this.props.TestCaseLogDetails.Execution_log['dest_count']}</span> 
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

const mapStateToProps = function (state) {
	console.log("CaseLogDetails.state", state);
	return {
		TestCase: state.testSuites.testCaseLog,
		TestCaseLogDetails: state.testSuites.testCaseLog.data.test_case_log.log_data 
	}
};

export default connect(mapStateToProps)(CaseLogDetails);