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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { hideTestCaseDialog } from '../actions';
import { showTestCaseEditEnabled } from '../actions';
import { viewTestCase } from '../actions'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
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

const handleChange = event => {
  setConnection(event.target.value);
};

class TestCaseDetails extends React.Component {  
  handleCaseDialogBoxClose = () => {
     console.log("handleCaseDialogBoxClose ==>", this.props);
     this.props.hideTestCaseDialog();
  };

  handleManageConnectionEditMode = () => {
    console.log("handleManageConnectionEditMode ==>", this.props);
    this.props.showTestCaseEditEnabled();
 };

  render() {
    console.log("ViewTestCaseDialogs==>", this.props);
    return (
      <div>
       { this.props.viewTestCase ? 
        <Dialog
          onClose={this.handleCaseDialogBoxClose}
          aria-labelledby="customized-dialog-title"
          open= {this.props.showTestCaseDialog}
        >
          
          <DialogTitle id="customized-dialog-title" onClose={this.handleCaseDialogBoxClose}>
          <label>Case-Detail:</label>  {this.props.viewTestCase.test_name}  
           <i className="fas fa-pencil-alt"></i><label onClick={this.handleManageConnectionEditMode()} style={{fontSize: '14px', cursor: 'pointer', marginLeft: '28px'}}>Edit</label>
          </DialogTitle>
          <DialogContent dividers>
            { this.props.showTestCaseEditEnabled ?
              <Table id='editMode'>
              <TableBody>
                 <TableRow>
                   <TableCell align="left">Source Connection2:
                     {/* <Select
                       onChange={handleChange}
                       name="selectConnection"
                       displayEmpty
                     >
                       <MenuItem value="" disabled>
                         Select Connection
                       </MenuItem>
                       {
                         this.props.connectionsList.all_connections ?
                         this.props.connectionsList.all_connections.map(connection => (
                         connection[1] ?
                           <MenuItem key={connection[0]} value={connection[0]}>{connection[1]}</MenuItem> : null
                       )) : null
                       }
                     </Select> */}
                   </TableCell>
                   <TableCell align="left">

                   </TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell align="left">Target Connection3:</TableCell>
                   <TableCell align="left"></TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell align="left">Source Table:</TableCell>
                   <TableCell align="left"></TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell align="left">Target Table:</TableCell>
                   <TableCell align="left"></TableCell>
                 </TableRow>
                 {/* <TableRow>
                   <TableCell align="left">Column:</TableCell>
                   <TableCell align="left"></TableCell>
                 </TableRow> */}
                 <TableRow>
                   <TableCell align="left">Source Query:</TableCell>
                   <TableCell align="left"></TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell align="left">Target Query:</TableCell>
                   <TableCell align="left"></TableCell>
                 </TableRow> 
                 </TableBody>
              </Table> : 
              <Table id='viewMode'>
                 <TableBody>
										<TableRow>
											<TableCell width="195px" align="left"><b>Source Connection:</b></TableCell>
											<TableCell align="left">{this.props.viewTestCase.src_db_id}</TableCell>
										</TableRow>
                    <TableRow>
											<TableCell align="left"><b>Target Connection:</b></TableCell>
											<TableCell align="left">{this.props.viewTestCase.target_db_id}</TableCell>
										</TableRow>
                    <TableRow>
											<TableCell align="left"><b>Source Table:</b></TableCell>
											<TableCell align="left">{this.props.viewTestCase.src_table}</TableCell>
										</TableRow>
                    <TableRow>
											<TableCell align="left"><b>Target Table:</b></TableCell>
											<TableCell align="left">{this.props.viewTestCase.target_table}</TableCell>
										</TableRow>
                    {/* <TableRow>
											<TableCell align="left">Column:</TableCell>
											<TableCell align="left">{this.props.viewTestCase.column}</TableCell>
										</TableRow> */}
                    <TableRow>
											<TableCell align="left"><b>Source Query:</b></TableCell>
											<TableCell align="left">{this.props.viewTestCase.src_qry}</TableCell>
										</TableRow>
                    <TableRow>
											<TableCell align="left"><b>Target Query:</b></TableCell>
											<TableCell align="left">{this.props.viewTestCase.des_qry}</TableCell>
										</TableRow>
									</TableBody>
              </Table>
              }
          </DialogContent>
        </Dialog>
       : null }
      </div>
    );
  }
}

const mapStateToProps = function (state) {
	console.log("ViewTestCase.state", state);
	return {
    showTestCaseDialog: state.testSuites.testCase.showTestCaseDialog,
    showTestCaseEditEnabled:state.testSuites.showTestCaseEditEnabled,
    viewTestCase:state.testSuites.testCase.res
	}
};

const mapDispatchToProps = function (dispatch) {
	return {
    hideTestCaseDialog: () => dispatch(hideTestCaseDialog()),
    showTestCaseEditEnabled: () => dispatch(showTestCaseEditEnabled())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseDetails);