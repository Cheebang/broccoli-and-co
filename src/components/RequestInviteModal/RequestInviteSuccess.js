import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const RequestInviteSuccess = props => (
  <div>
    <Modal.Header closeButton>
      <Modal.Title>All done!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>
        You will be one of the first to experience Broccoli & Co when we launch!
      </div>
      <Button type="button" onClick={props.onHide}>
        Ok
      </Button>
    </Modal.Body>
  </div>
);

RequestInviteSuccess.propTypes = { onHide: PropTypes.func.isRequired };
export default RequestInviteSuccess;
