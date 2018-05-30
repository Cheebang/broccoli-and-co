import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Modal,
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
import { getConfirmEmailValidationState } from "../../reducers/requestInviteReducer";

class RequestInviteForm extends Component {
  render() {
    const buttonDisabled =
      this.props.submissionInProgress ||
      this.props.confirmEmailValidationState === "error";
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Request an invite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.props.onSubmit}>
            <FormGroup>
              <ControlLabel>Full name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter your full name"
                onChange={this.props.setNameAction}
                required="true"
                minLength="3"
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="email"
                placeholder="Enter your email"
                onChange={this.props.setEmailAction}
                required="true"
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup validationState={this.props.confirmEmailValidationState}>
              <ControlLabel>Confirm email</ControlLabel>
              <FormControl
                type="email"
                placeholder="Confirm your email"
                onChange={this.props.setConfirmEmailAction}
                required="true"
              />
              <FormControl.Feedback />
            </FormGroup>
            <div>{this.props.errorMessage}</div>
            <Button type="submit" disabled={buttonDisabled}>
              {this.props.submissionInProgress && "Sending.... please wait"}
              {!this.props.submissionInProgress && "Submit"}
            </Button>
          </form>
        </Modal.Body>
      </div>
    );
  }
}

RequestInviteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setNameAction: PropTypes.func.isRequired,
  setEmailAction: PropTypes.func.isRequired,
  setConfirmEmailAction: PropTypes.func.isRequired,
  confirmEmailValidationState: PropTypes.string
};

const mapStateToProps = state => ({
  confirmEmailValidationState: getConfirmEmailValidationState(state)
});
const mapDispatchToProps = dispatch => ({
  setNameAction: event => dispatch(setName(event.target.value)),
  setEmailAction: event => dispatch(setEmail(event.target.value)),
  setConfirmEmailAction: event => dispatch(setConfirmEmail(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestInviteForm);
