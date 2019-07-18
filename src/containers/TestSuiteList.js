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
		width: '500px',
		borderRadius: '25px',
		boxShadow: '4px',
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
		fontWeight: 'bold'
	},
	statusBgBlue: {
		fontSize: theme.typography.pxToRem(15),
		color: 'blue',
		fontWeight: 'bold'
	},
	statusBgRed: {
		fontSize: theme.typography.pxToRem(15),
		color:'rgb(245, 124, 76)',
		fontWeight: 'bold'
	},
	statusBgOrange: {
		fontSize: theme.typography.pxToRem(15),
		color: '#F7861B',
		fontWeight: 'bold'
	},
	executionWidth: {width: '20%'},
}));

function ControlledExpansionPanels({ testSuites }) {
	console.log('ControlledExpansionPanels constructor');
	const testSuiteDataLen = testSuites && testSuites.suites ? Object.keys(testSuites.suites).length : 0;
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
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

	return (
		<div className={classes.root}>
			{ testSuiteDataLen > 0 ?
				testSuites.suites.user.map(testSuite => (
					<ExpansionPanel key={testSuite.test_suite_id} expanded={expanded === testSuite.test_suite_id} onChange={handleChange(testSuite.test_suite_id)}>
						
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header">
							<Typography className={classes.heading}>{testSuite.test_suite_name}</Typography>
							<Typography className={classes.manageConnection}>Manage Connections</Typography>
							<Typography className={classes.suiteID}>SuiteID:{testSuite.test_suite_id}</Typography>
							<Typography className={classes.secondaryHeading}>Uploaded at:  {testSuite.created}</Typography>
						</ExpansionPanelSummary>

						<ExpansionPanelDetails>
							<div className={classes.innerPanelWidth}>
								{ testSuite.test_case_list.map(testCaseList => (
									<ExpansionPanel key={testCaseList.test_case_id}>

										<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
											<Typography className={classes.subHeading}>{testCaseList.test_id}</Typography>
											<Typography className={classes.manageConnection}>View</Typography>
											<Typography className={classes.status}>Status</Typography>
											<Typography className={renderTestStatus(testCaseList.test_status)}>{testCaseList.test_name}</Typography>
										</ExpansionPanelSummary>
										
										<ExpansionPanelDetails>
											<div className={classes.rcorners}>
												<Table >
													<TableHead>
														<TableRow>
															<TableCell>Run ID</TableCell>
															<TableCell align="right">Execution Status</TableCell>
															<TableCell align="right">Execution At</TableCell>
															<TableCell align="right">Log</TableCell>
														</TableRow>
													</TableHead>
													{ testCaseList.test_case_log.map(testCaseLog => (
														<TableBody key={testCaseLog.test_case_log_id}>
															<TableRow>
																<TableCell align="right"></TableCell>
																<TableCell align="right">{testCaseLog.executed_at}</TableCell>
																<TableCell align="right"></TableCell>
																<TableCell align="right"></TableCell>
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
				)) : <div className={classes.noRecord}>No Test Suite found!</div> }
		</div>
	);
};

const mapStateToProps = function (state) {
	console.log("TestSuiteList.state", state);
	return {
		testSuites: state.testSuites.testSuiteList
	}
};

export default connect(mapStateToProps)(ControlledExpansionPanels);