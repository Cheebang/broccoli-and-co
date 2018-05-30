import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Modal,
  Alert,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";

import {
  setName,
  setEmail,
  setConfirmEmail
} from "../../actions/requestInviteActions";
import {
  getConfirmEmailValidationState,
  getErrorMessage,
  getSubmissionInProgress
} from "../../reducers/requestInviteReducer";

export const RequestInviteForm = props => {
  const buttonDisabled =
    props.submissionInProgress || props.confirmEmailValidationState === "error";
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Request an invite</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={props.onSubmit}>
          <FormGroup>
            <ControlLabel>Full name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter your full name"
              onChange={props.setNameAction}
              required="true"
              minLength="3"
              autoFocus="true"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              placeholder="Enter your email"
              onChange={props.setEmailAction}
              required="true"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup validationState={props.confirmEmailValidationState}>
            <ControlLabel>Confirm email</ControlLabel>
            <FormControl
              type="email"
              placeholder="Confirm your email"
              onChange={props.setConfirmEmailAction}
              required="true"
            />
            <FormControl.Feedback />
          </FormGroup>
          {props.errorMessage && (
            <Alert bsStyle="danger">{props.errorMessage}</Alert>
          )}
          <Button type="submit" disabled={buttonDisabled}>
            {props.submissionInProgress && "Sending.... please wait"}
            {!props.submissionInProgress && "Submit"}
          </Button>
        </form>
      </Modal.Body>
    </div>
  );
};

RequestInviteForm.propTypes = {
  errorMessage: PropTypes.string,
  submissionInProgress: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setNameAction: PropTypes.func.isRequired,
  setEmailAction: PropTypes.func.isRequired,
  setConfirmEmailAction: PropTypes.func.isRequired,
  confirmEmailValidationState: PropTypes.string
};

const mapStateToProps = state => ({
  errorMessage: getErrorMessage(state),
  submissionInProgress: getSubmissionInProgress(state),
  confirmEmailValidationState: getConfirmEmailValidationState(state)
});
const mapDispatchToProps = dispatch => ({
  setNameAction: event => dispatch(setName(event.target.value)),
  setEmailAction: event => dispatch(setEmail(event.target.value)),
  setConfirmEmailAction: event => dispatch(setConfirmEmail(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestInviteForm);
