import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Table } from 'react-bootstrap';
import ManageConnection from '../components/ManageConnection';
import ViewLogs from '../components/ViewLogs';
import { renderStatusLabel, renderStatusIcon } from '../components/ViewLogDetails';
import ViewTestCase from '../components/ViewTestCase';

import { 
	getAllConnections, 
	getTestCaseByTestCaseId, 
	getTestCaseLogById, 
	executeTestBySuiteId, 
	executeTestByCaseId,
	getTestCaseDetailBySuiteId
} from '../actions/testSuiteListActions';

import icon_new from '../assets/images/icon_new.jpg';
// import { ICON_STATUS_ERROR, ICON_STATUS_FAIL, ICON_STATUS_SUCCESS } from '../constants/icons';
import { NEW, PASS, FAIL, ERROR, INPROGRESS, INPROGRESS_ID, PASS_ID, FAIL_ID, ERROR_ID, NEW_ID } from '../constants/common';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(13),
		fontWeight: 'bold',
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(13),
		flexBasis: '33.33%',
		color: theme.palette.text.secondary,
	},
	subHeading: {
		fontSize: theme.typography.pxToRem(13),
		fontWeight: 'bold',
		flexBasis: '40%',
		flexShrink: 0,
	},
	suiteID: {
		fontSize: theme.typography.pxToRem(13),
		fontWeight: 'bold',
		flexBasis: '18.33%',
		flexShrink: 0,
	},
	manageConnection: {
		fontSize: theme.typography.pxToRem(13),
		flexBasis: '23.33%',
		color: 'brown',
	},
	rcorners: {
		border: '2px solid',
		padding: '20px',
		width: '580px',
		borderRadius: '25px',
		boxShadow: '4px',
	},
	viewConnection: {
		fontSize: theme.typography.pxToRem(13),
		flexBasis: '18.33%',
		flexShrink: 0,
		color: 'brown',
	},
	status: {
		fontSize: theme.typography.pxToRem(13),
		flexBasis: '18.33%',
		flexShrink: 0,
		fontWeight: 'bold'
	},
	statusImg: {flexBasis: '20%'},
	noRecord: {color: 'red', textAlign: 'center'},
	innerPanelWidth: {width:'1080px'},
	statusBg: {
		fontSize: theme.typography.pxToRem(13),
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	statusBgBlue: {
		fontSize: theme.typography.pxToRem(13),
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	statusBgRed: {
		fontSize: theme.typography.pxToRem(13),
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	statusBgOrange: {
		fontSize: theme.typography.pxToRem(13),
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	executionWidth: {width: '20%'},
	caseLog: {cursor: 'pointer'},
}));

function ControlledExpansionPanels({ testSuites, getAllConnections, getTestCaseDetailBySuiteId, getTestCaseLogById, 
	getTestCaseByTestCaseId, executeTestBySuiteId, executeTestByCaseId, showConnectionsDialog }) {

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);	

	useEffect(() => {
		const projectId = 1; // remove this hardcoded assignment
		getAllConnections(projectId);
	}, []);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handleManageConnection = (e, suiteID) => {
		getTestCaseDetailBySuiteId(suiteID);
		e.stopPropagation();
	};

	const viewTestCase = (e, caseID) => {
		getTestCaseByTestCaseId(caseID);
		e.stopPropagation();
	};

	const viewTestCaseLogs = (testCaselogId, testCaseName) => {
		getTestCaseLogById(testCaselogId, testCaseName);
	};

	const renderTestName = (status) => {
		switch(status) {
		case INPROGRESS_ID:
		case INPROGRESS:
			return classes.statusBgOrange;
		case PASS_ID:
		case PASS:
			return classes.statusBg;
		case FAIL_ID:
		case FAIL:
			return classes.statusBgRed;
		case ERROR_ID:
		case ERROR:
			return classes.statusBgRed;
		case NEW_ID:
		case NEW:
			return classes.statusBgBlue;
		default:
			return '';
		}
	};

	const runTestSuite = (e, suiteID) => {
		e.stopPropagation();
		executeTestBySuiteId(suiteID);
	};

	const runTestCase = (e, caseID) => {
		e.stopPropagation();
		executeTestByCaseId([caseID]);
	}

	const onHover = (e) => {
		e.currentTarget.style.color = '#337ab7';
	};

	const onHout = (e) => {
		e.currentTarget.style.color = '';
	};

	return (
		<div className={classes.root}>
			{ 
				(testSuites) ? testSuites.map(testSuite => (
					<ExpansionPanel key={testSuite.test_suite_id} expanded={expanded === testSuite.test_suite_id} onChange={handleChange(testSuite.test_suite_id)}>
						
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header">
							<Typography className={classes.heading}>{testSuite.test_suite_name}</Typography>
							<Typography className={classes.manageConnection} onMouseOver={e => onHover(e)} onMouseOut={e => onHout(e)} onClick={e => handleManageConnection(e, testSuite.test_suite_id)}>Manage Connections</Typography>
							<Typography className={classes.suiteID}>SuiteID: {testSuite.test_suite_id}</Typography>
							<Typography className={classes.secondaryHeading}>Uploaded at:  {testSuite.created_at}</Typography>
							<i className="far fa-play-circle statusPlayIcon" onMouseOver={e => onHover(e)} onMouseOut={e => onHout(e)} onClick={(e) => runTestSuite(e, testSuite.test_suite_id)} aria-hidden="true"></i>
						</ExpansionPanelSummary>

						<ExpansionPanelDetails>
							<div className={classes.innerPanelWidth}>
								{ testSuite.test_case_list.map(testCaseList => (
									<ExpansionPanel key={testCaseList.test_case_id}>
										<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
											<Typography className={classes.subHeading}>{testCaseList.test_class_description}</Typography>
											<Typography className={classes.viewConnection} onMouseOver={e => onHover(e)} onMouseOut={e => onHout(e)} onClick={e => viewTestCase(e, testCaseList.test_case_id)}>View</Typography>
											<Typography className={classes.status}>Status&nbsp;&nbsp;&nbsp;{renderStatusIcon(testCaseList.test_status)}</Typography>
											<Typography className={renderTestName(testCaseList.test_status)}>{testCaseList.test_class_name}</Typography>
											<Typography><i className="far fa-play-circle statusPlayIcon" onMouseOver={e => onHover(e)} onMouseOut={e => onHout(e)} onClick={(e) => runTestCase(e, testCaseList.test_case_id)} aria-hidden="true"></i></Typography>
										</ExpansionPanelSummary>										
										<ExpansionPanelDetails>
											<div>
												{ testCaseList.test_case_log_list && testCaseList.test_case_log_list.length > 0 ?
													<Table striped bordered hover size="sm" id="RoundedTable">
														<thead>
															<tr>
																<th className="testLogHeading">Execution Status</th>
																<th className="testLogHeading">Execution At</th>
																<th className="testLogHeading">Logs</th>	
															</tr>
														</thead>
														<tbody>
															{ testCaseList.test_case_log_list && testCaseList.test_case_log_list.map(testCaseLog => (
																<tr key={testCaseLog.test_case_log_id}>
																	<td className="testLogData">{renderStatusLabel(testCaseLog.test_execution_status)}</td>
																	<td className="testLogData">{testCaseLog.executed_at}</td>
																	{ (testCaseLog.test_execution_status != NEW_ID && testCaseLog.test_execution_status != INPROGRESS_ID) ?
																	  <td className={classes.caseLog} onClick={e => viewTestCaseLogs(testCaseLog.test_case_log_id, testCaseList.test_class_name)}>
																		 <i className="far fa-sticky-note logsIcon"></i>
																	 </td>
																	: <td>---</td> }
																</tr>
															))}
														</tbody>
													</Table>
												: <span className="red">No Logs found.</span> }		
											</div>
										</ExpansionPanelDetails>
									</ExpansionPanel>
								)) }
							</div>
						</ExpansionPanelDetails>

					</ExpansionPanel>
				)) : null
			}
			{ 
				showConnectionsDialog ?
					<ManageConnection></ManageConnection>
				: null
			}
			<ViewTestCase></ViewTestCase>
			<ViewLogs></ViewLogs>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		testSuites: state.testSuites.testSuiteList? state.testSuites.testSuiteList: [],
		showConnectionsDialog: state.testSuites.connectionsList.showConnectionsDialog
	};
};

export default connect(mapStateToProps, {
	getAllConnections, 
	getTestCaseLogById, 
	getTestCaseByTestCaseId, 
	executeTestBySuiteId, 
	executeTestByCaseId,
	getTestCaseDetailBySuiteId
})(ControlledExpansionPanels);