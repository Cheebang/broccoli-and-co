import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const RequestInviteSuccess = props => (
  <div>
    <Modal.Header closeButton>
      <Modal.Title>All done!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      You will be one of the first to experience Broccoli &amp; Co when we launch!
    </Modal.Body>
    <Modal.Footer>
      <Button type="button" onClick={props.onHide}>Ok</Button>
    </Modal.Footer>
  </div>
);

RequestInviteSuccess.propTypes = { onHide: PropTypes.func.isRequired };
export default RequestInviteSuccess;
