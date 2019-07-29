import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { hideCaseLogDialog, viewTestCaseLog } from '../actions/testSuiteListActions';

const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
		width: '600px',
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

class CaseLogs extends React.Component {
	handleCaseLogDialogBoxClose = () => {
		 console.log("handleCaseLogDialogBoxClose ==>", this.props);
		 this.props.hideCaseLogDialog();
	};

	render() {
		console.log("ViewDialogs==>", this.props);
		return (
			<div>
				<Dialog
					onClose={this.handleCaseLogDialogBoxClose}
					aria-labelledby="customized-dialog-title"
					open= {this.props.showCaseLogDialog}
				>
					<DialogTitle id="customized-dialog-title" onClose={this.handleCaseLogDialogBoxClose}>
						viewLogs
					</DialogTitle>
					<DialogContent dividers>
							
					</DialogContent>
					<DialogActions>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = function (state) {
	console.log("ViewLogs.state", state);
	return {
		showCaseLogDialog: state.testSuites.testCaseLog.showCaseLogDialog,
		viewLogs:state.testSuites.testCaseLog    
	}
};

const mapDispatchToProps = function (dispatch) {
	return {
		hideCaseLogDialog: () => dispatch(hideCaseLogDialog())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseLogs);