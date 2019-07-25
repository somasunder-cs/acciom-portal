import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ManageConnectionRadioButtons from './ManageConnectionRadioButtons';

import { hideManageConnectionsDialog } from '../actions';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
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
    padding: theme.spacing(1),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class ManageConnection extends React.Component {
  handleDialogBoxClose = () => {
    console.log("ManageConnectionClose==>", this.props);
    this.props.hideManageConnectionsDialog();
  };

  handleManageConnectionSave = (e) => {
    console.log("handleManageConnectionSave==>", this.props);
    this.props.handleConnectionSave();
  };

  
  render() {
    console.log("ManageConnection==>", this.props);
    return (
        <Dialog className="MuiDialogWidth"
          onClose={this.handleDialogBoxClose}
          open={this.props.showConnectionsDialog}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleDialogBoxClose}>
            Manage Connections
          </DialogTitle>
          <DialogContent dividers>
              <ManageConnectionRadioButtons></ManageConnectionRadioButtons>
          </DialogContent>
          <DialogActions>
          <Button variant="contained" color="primary" onClick={e => handleManageConnectionSave(e)}>
            Save
          </Button>
          <Button variant="contained" color="primary">
            Reset
          </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

const mapStateToProps = function (state) {
	console.log("ManageConnection.state", state);
	return {
		showConnectionsDialog: state.testSuites.connectionsList.showConnectionsDialog
	}
};

const mapDispatchToProps = function (dispatch) {
	return {
    hideManageConnectionsDialog: () => dispatch(hideManageConnectionsDialog())
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageConnection);