import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import { Table } from 'react-bootstrap';

import { manageConnectionsCaseUpdate } from '../actions/testSuiteListActions';

const BootstrapInput = withStyles(theme => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(1),
		},
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}))(InputBase);

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	margin: {
		margin: theme.spacing(1),
	},
	MuiSelect: {minWidth:'160px'},
}));

function ManageConnectionSelect({connectionsList}) {
	console.log("ManageConnectionSelect constructor", connectionsList);
	const classes = useStyles();
	const [connection, setConnection] = React.useState('');
	const [state, setState] = React.useState({
		checkedA: false
	});

	function handleManageConnectionCaseUpdate(val) {
		console.log("handleManageConnectionCaseUpdate.state", val);
	};

	const handleChange = event => {
		setConnection(event.target.value);
	};

	return (
		<form className={classes.root} autoComplete="off">
			<Table className="manageSelectConnection">
				<tbody>
					<tr>
						<td className="manageConnectionLabel"><label className="manageConnectionHeading">Select Connection:</label></td>
						<td>
							<select className="form-control selectconnection"
								value={connection}
								onChange={handleChange}
								name="selectConnection"
							>
								{ connectionsList.all_connections.map(connection => (
									connection[1] ?
										<option key={connection[0]} value={connection[0]}>{connection[1]}</option> : null
								))
								}
							</select>
						</td>
					</tr> 
					<tr>
						<td className="manageConnectionLabel"><label className="manageConnectionHeading">Select Cases:</label></td>
						<td>
							{
								connectionsList.all_cases.map(cases => (
									<div key={cases[0]} className="manageconnectionTestCase">
										<label className="form-check-label">
											<input
												type="checkbox"
												value={cases[0]}
												name={cases[0]}
												onChange={handleManageConnectionCaseUpdate(cases[0])}
											/>
										</label> {cases[1]}
									</div>
								))
							}
						</td>
					</tr>
				</tbody>
			</Table>  
		</form>
	);
}

const mapStateToProps = function (state) {
	console.log("ManageConnectionSelect.state", state);
	return {
		connectionsList: state.testSuites.connectionsList
	}
};

const mapDispatchToProps = function (dispatch) {
	return {
		onManageConnectionsCaseUpdate: data => dispatch(manageConnectionsCaseUpdate(data))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageConnectionSelect);