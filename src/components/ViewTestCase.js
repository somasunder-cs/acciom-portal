import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { Table, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

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

handleViewTestCaseChange = ({target}) => {
  console.log("handleViewTestCaseChange ==>", this.props);
}

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
                <label className="testViewHeading">Case-Details:</label>  <label className="testViewData">{this.props.viewTestCase.test_name}</label>
                { this.props.showTestCaseEdit ? <label onClick={this.handleManageConnectionViewMode} className="viewEditLabel"><i className="fas fa-long-arrow-alt-left"></i>&nbsp;View Details</label> :
                  <label onClick={this.handleManageConnectionEditMode} className="viewEditLabel">Edit&nbsp;
                  <i className="fas fa-pencil-alt"></i></label>
                }  
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              { this.props.showTestCaseEdit ?
               <form id="testEditMode">
                <Table id="editMode">
                  <tbody>
                      <tr>
                      <td className="manageConnectionLabel"><label className="testViewDataLabel">Source Connection:</label></td>
                      <td>             
                      <select className="form-control selectconnection"
                        value=""
                        onChange={handleChange}
                        name="selectConnection"
                      >
                        {/* { connectionsList.all_connections.map(connection => (
                          connection[1] ?
                          <option key={connection[0]} value={connection[0]}>{connection[1]}</option> : null
                        ))
                        } */}
                      </select>
                     </td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel">
                        <label className="testViewDataLabel">Target Connection:</label>
                      </td>
                      <td>             
                      <select className="form-control selectconnection"
                        value=""
                        onChange={handleChange}
                        name="selectConnection"
                      >
                        {/* { connectionsList.all_connections.map(connection => (
                          connection[1] ?
                          <option key={connection[0]} value={connection[0]}>{connection[1]}</option> : null
                        ))
                        } */}
                      </select>
                     </td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel">
                        <label className="testViewDataLabel">Source Table:</label>
                      </td>
                      <td>
                      <FormGroup>
                        <FormControl type="textbox" name="sourcetable" value={this.props.viewTestCase.src_table} onChange={this.handleViewTestCaseChange}/>
                      </FormGroup>
                      </td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label className="testViewDataLabel">Target Table:</label></td>
                      <td>
                      <FormGroup>
                        <FormControl type="textbox" name="targettable" value={this.props.viewTestCase.target_table} onChange={this.handleViewTestCaseChange}/>
                      </FormGroup>
                      </td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label className="testViewDataLabel">Source Query:</label></td>
                      <td>
                      <FormGroup>
                        <textarea name="srcqry" value={this.props.viewTestCase.src_qry} onChange={this.handleViewTestCaseChange}/>
                      </FormGroup>
                      </td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label className="testViewDataLabel">Target Query:</label></td>
                      <td>
                      <FormGroup>
                        <textarea name="descqry" value={this.props.viewTestCase.des_qry} onChange={this.handleViewTestCaseChange}/>
                      </FormGroup>
                      </td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"></td>
                      <td>
                        <Button className="btn btn-primary" onClick={e => this.handleManageConnectionUpdate(e)}>
                          Update
                        </Button>
                      </td>
                    </tr>
                  </tbody>
              </Table>
              </form>
              :  
              <Table className="manageConnection" id="viewMode">
                  <tbody>
                    <tr>
                      <td className="manageConnectionLabel"><label className="testViewDataLabel">Source Connection:</label></td>
                      <td>{this.props.viewTestCase.src_db_id}</td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label className="testViewDataLabel">Target Connection:</label></td>
                      <td>{this.props.viewTestCase.target_db_id}</td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label className="testViewDataLabel">Source Table:</label></td>
                      <td>{this.props.viewTestCase.src_table}</td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label className="testViewDataLabel">Target Table:</label></td>
                      <td>{this.props.viewTestCase.target_table}</td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label className="testViewDataLabel">Source Query:</label></td>
                      <td>{this.props.viewTestCase.src_qry}</td>
                    </tr>
                    <tr>
                      <td className="manageConnectionLabel"><label className="testViewDataLabel">Target Query:</label></td>
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