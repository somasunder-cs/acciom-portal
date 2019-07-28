import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Modal, Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { Table } from 'react-bootstrap';

import { hideTestCaseDialog } from '../actions';
import { showTestCaseEditEnabled } from '../actions';
import { showTestCaseViewEnabled } from '../actions';
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  selectWidth: {width: 156},
});


const handleChange = event => {
 // setConnection(event.target.value);
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

 handleManageConnectionViewMode = () => {
  console.log("handleManageConnectionViewMode ==>", this.props);
  this.props.showTestCaseViewEnabled();
};

  render() {
    console.log("ViewTestCaseDialogs==>", this.props);
    return (
      <div>
      { 
        this.props.viewTestCase ?
              <Modal
              show={this.props.showTestCaseDialog}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              onHide={this.handleCaseDialogBoxClose}
              className="ModalMargin"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                <label>Case-Detail:</label>  {this.props.viewTestCase.test_name}
                { this.props.showTestCaseEdit ? <label onClick={this.handleManageConnectionViewMode} className="viewEditLabel"><i className="fas fa-long-arrow-alt-left"></i>&nbsp;View Details</label> :
                  <label onClick={this.handleManageConnectionEditMode} className="viewEditLabel">Edit&nbsp;
                  <i className="fas fa-pencil-alt"></i></label>
                }  
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              { this.props.showTestCaseEdit ?
                <Table striped bordered hover size="sm" id="editMode">
                  <tbody>
                      <tr>
                      <td className="manageConnectionLabel"><label>Source Connection:</label></td>
                      <td>             
                          <Select
                        onChange={handleChange}
                        name="selectConnection"
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select Connection
                        </MenuItem>
                          <MenuItem></MenuItem>
                      </Select>
                     </td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label>Target Connection:</label></td>
                      <td>             
                          <Select
                        onChange={handleChange}
                        name="targetConnection"
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select Connection
                        </MenuItem>
                          <MenuItem></MenuItem>
                      </Select>
                     </td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label>Source Table:</label></td>
                      <td>
                      <TextField
                        required
                        id="standard-required"
                        value={this.props.viewTestCase.src_table}
                        className={styles.textField}
                        margin="normal"
                      />

                      </td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label>Target Table:</label></td>
                      <td>
                      <TextField
                        required
                        id="standard-required"
                        value={this.props.viewTestCase.target_table}
                        className={styles.textField}
                        margin="normal"
                      />
                      </td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label>Source Query:</label></td>
                      <td><TextField
                        required
                        id="standard-required"
                        value={this.props.viewTestCase.src_qry}
                        className={styles.textField}
                        margin="normal"
                      /></td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label>Target Query:</label></td>
                      <td><TextField
                        required
                        id="standard-required"
                        value={this.props.viewTestCase.des_qry}
                        className={styles.textField}
                        margin="normal"
                      /></td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"></td>
                      <td><Button className="btn btn-primary" onClick={e => this.handleManageConnectionUpdate(e)}>
                          Update
                          </Button>
                      </td>
                    </tr>
                  </tbody>
              </Table>
              :  
              <Table className="manageConnection" id="editMode">
                  <tbody>
                    <tr>
                      <td className="manageConnectionLabel"><label>Source Connection:</label></td>
                      <td>{this.props.viewTestCase.src_db_id}</td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label>Target Connection:</label></td>
                      <td>{this.props.viewTestCase.target_db_id}</td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label>Source Table:</label></td>
                      <td>{this.props.viewTestCase.src_table}</td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label>Target Table:</label></td>
                      <td>{this.props.viewTestCase.target_table}</td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label>Source Query:</label></td>
                      <td>{this.props.viewTestCase.src_qry}</td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label>Target Query:</label></td>
                      <td>{this.props.viewTestCase.des_qry}</td>
                    </tr>
                  </tbody>
              </Table>
              }
              </Modal.Body>
              <Modal.Footer>
              {/* <Button className="btn btn-primary" onClick={e => this.handleManageConnectionSave(e)}>
              Save
              </Button>
              <Button className="btn btn-primary">Reset</Button> */}
              </Modal.Footer>
            </Modal> : null
           }
        </div>
    );
  }
}

const mapStateToProps = function (state) {
	console.log("ViewTestCase.state", state);
	return {
    showTestCaseDialog: state.testSuites.testCase.showTestCaseDialog,
    showTestCaseEdit:state.testSuites.showTestCaseEditEnabled,
    viewTestCase:state.testSuites.testCase.res
	}
};

export default connect(mapStateToProps, {
	showTestCaseEditEnabled, showTestCaseViewEnabled, hideTestCaseDialog
})(TestCaseDetails);