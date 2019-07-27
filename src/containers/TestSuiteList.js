import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ManageConnection from '../components/ManageConnection';
import ViewLogs from '../components/ViewLogs';
import ViewTestCase from '../components/ViewTestCase';

import { getAllConnections } from '../middleware';
import { getTestCases } from '../middleware';
import { testCaseLogs } from '../middleware';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: 'bold',
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		color: theme.palette.text.secondary,
	},
	subHeading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: 'bold',
		flexBasis: '40%',
		flexShrink: 0,
	},
	suiteID: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: 'bold',
		flexBasis: '18.33%',
		flexShrink: 0,
	},
	manageConnection: {
		fontSize: theme.typography.pxToRem(15),
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
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '18.33%',
		flexShrink: 0,
		color: 'brown',
	},
	status: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '18.33%',
		flexShrink: 0,
	},
	statusImg: {flexBasis: '20%'},
	noRecord: {color: 'red', textAlign: 'center'},
	innerPanelWidth: {width:'950px'},
	statusBg: {
		fontSize: theme.typography.pxToRem(15),
		color: '#2ecca4',
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	statusBgBlue: {
		fontSize: theme.typography.pxToRem(15),
		color: 'blue',
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	statusBgRed: {
		fontSize: theme.typography.pxToRem(15),
		color:'rgb(245, 124, 76)',
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	statusBgOrange: {
		fontSize: theme.typography.pxToRem(15),
		color: '#F7861B',
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	executionWidth: {width: '20%'},
	caseLog: {cursor: 'pointer'},
}));


function ControlledExpansionPanels({ testSuites, getAllConnections, testCaseLogs, getTestCases}) {
	console.log('ControlledExpansionPanels constructor');
	const testSuiteDataLen = testSuites && testSuites.suites ? Object.keys(testSuites.suites).length : 0;
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);	
	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handleManageConnection = (e) => {
		console.log('handleManageConnection ===>');
		getAllConnections();
		e.stopPropagation();
	};

	const viewTestCase = (e) => {
		console.log('viewTestCase ===>');
		getTestCases();
		e.stopPropagation();
	};

	const viewTestCaseLogs = (e) => {
		console.log('viewTestCaseLogs ===>');
		testCaseLogs();
	};

	const renderTestStatus = (status) => {
		switch(status) {
		case 0:
			return classes.statusBgBlue;
		case 1:
			return classes.statusBg;
		case 2:
			return classes.statusBgRed;
		case 3:
			return classes.statusBgOrange;
		case 4:
			return classes.statusBgRed;
		default:
			return '';
		}
	};

	const renderExecutionStatus = (status) => {
		let labelColor, label = '';
		switch(status) {
		case 0:
			labelColor = 'blue';
			label = 'New';
			return <label style={{ color: labelColor }}>{label}</label>;
		case 1:
			labelColor = '#4ac69b';
			label = 'Pass';
			return <label style={{ color: labelColor }}>{label}</label>;
		case 2:
			labelColor = '#ef8160';
			label = 'Fail';
			return <label style={{ color: labelColor }}>{label}</label>;
		case 3:
			labelColor = '#f3a563';
			label = 'In Progress';
			return <label style={{ color: labelColor }}>{label}</label>;
		case 4:
			labelColor = '#e56868';
			label = 'Error';
			return <label style={{ color: labelColor }}>{label}</label>;
		default:
			labelColor = '';
			label = '';
			return <label style={{ color: labelColor }}>{label}</label>;				
		}
	};

	return (
		<div className={classes.root}>
			{ 
				testSuiteDataLen > 0 ?
				testSuites.suites.user.map(testSuite => (
					<ExpansionPanel key={testSuite.test_suite_id} expanded={expanded === testSuite.test_suite_id} onChange={handleChange(testSuite.test_suite_id)}>
						
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header">
							<Typography className={classes.heading}>{testSuite.test_suite_name}</Typography>
							<Typography className={classes.manageConnection} onClick={e => handleManageConnection(e, getAllConnections)}>Manage Connections</Typography>
							<Typography className={classes.suiteID}>SuiteID:{testSuite.test_suite_id}</Typography>
							<Typography className={classes.secondaryHeading}>Uploaded at:  {testSuite.created}</Typography>
							<i className="fa fa fa-play" aria-hidden="true"></i>
						</ExpansionPanelSummary>

						<ExpansionPanelDetails>
							<div className={classes.innerPanelWidth}>
								{ testSuite.test_case_list.map(testCaseList => (
									<ExpansionPanel key={testCaseList.test_case_id}>

										<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
											<Typography className={classes.subHeading}>{testCaseList.test_id}</Typography>
											<Typography className={classes.viewConnection} onClick={e => viewTestCase(e, getTestCases)}>View</Typography>
											<Typography className={classes.status}>Status</Typography>
											<Typography className={renderTestStatus(testCaseList.test_status)}>{testCaseList.test_name}</Typography>
											<Typography><i className="fa fa fa-play" aria-hidden="true"></i></Typography>
										</ExpansionPanelSummary>
										
										<ExpansionPanelDetails>
											<div className={classes.rcorners}>
												<Table >
													<TableHead>
														<TableRow>
															<TableCell>Run ID</TableCell>
															<TableCell align="left">Execution Status</TableCell>
															<TableCell align="left">Execution At</TableCell>
															<TableCell align="left">Logs</TableCell>
														</TableRow>
													</TableHead>													
													{  
														testCaseList.test_case_log.map(testCaseLog => (
														<TableBody key={testCaseLog.test_case_log_id}>
															<TableRow>
																<TableCell align="left"></TableCell>
																<TableCell align="left">{renderExecutionStatus(testCaseLog.test_execution_status)}</TableCell>
																<TableCell align="left">{testCaseLog.executed_at}</TableCell>
																<TableCell align="left" className={classes.caseLog} onClick={e => viewTestCaseLogs(e, testCaseLogs)}><i className="fas fa-grip-lines"></i></TableCell>
															</TableRow>
														</TableBody>
													))}
												</Table>
											</div>
										</ExpansionPanelDetails>
									</ExpansionPanel>
								)) }
							</div>
						</ExpansionPanelDetails>

					</ExpansionPanel>
				)) : null
				}
				<ManageConnection></ManageConnection>
				<ViewTestCase></ViewTestCase>
				<ViewLogs></ViewLogs>				
		</div>
	);
};

const mapStateToProps = function (state) {
	console.log("TestSuiteList.state", state);
	return {
		testSuites: state.testSuites.testSuiteList
	}
};

export default connect(mapStateToProps, {
	getAllConnections, testCaseLogs, getTestCases
})(ControlledExpansionPanels);