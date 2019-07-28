import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import ManageConnectionInputs from './ManageConnectionInputs';
import ManageConnectionSelect from './ManageConnectionSelect';

import { hideManageConnectionsDialog } from '../actions';

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
    <Modal
      show={this.props.showConnectionsDialog}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={this.handleDialogBoxClose}
      className="ModalMargin"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         <label className="manageConnectionHeading">Manage Connections</label>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <ManageConnectionInputs></ManageConnectionInputs>
         <ManageConnectionSelect></ManageConnectionSelect>
      </Modal.Body>
      <Modal.Footer>
      <Button className="btn btn-primary" onClick={e => this.handleManageConnectionSave(e)}>
       Save
      </Button>
      <Button className="btn btn-primary">Reset</Button>
      </Modal.Footer>
    </Modal>
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