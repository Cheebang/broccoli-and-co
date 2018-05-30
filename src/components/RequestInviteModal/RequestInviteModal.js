import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import request from "superagent";

import {
  getRequestParams,
  getRequestSubmitted,
  getSubmissionInProgress,
  getErrorMessage
} from "../../reducers/requestInviteReducer";
import RequestInviteForm from "./RequestInviteForm";
import RequestInviteSuccess from "./RequestInviteSuccess";
import {
  resetState,
  setSubmissionInProg,
  setErrorMessage,
  setRequestSubmitted
} from "../../actions/requestInviteActions";

export class RequestInviteModal extends Component {
  constructor(props) {
    super(props);
    this.onHide = this.onHide.bind(this);
    this.requestInvite = this.requestInvite.bind(this);
  }

  requestInvite(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(setSubmissionInProg(true));
    dispatch(setErrorMessage(""));
    request
      .post("https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth")
      .send(this.props.requestParams)
      .end((err, resp) => {
        dispatch(setSubmissionInProg(false));
        if (resp.ok) {
          dispatch(setRequestSubmitted(true));
        } else if (resp.body.errorMessage) {
          dispatch(setErrorMessage(resp.body.errorMessage));
        }
      });
  }

  onHide() {
    this.props.dispatch(resetState());
    this.props.onHide();
  }

  renderInviteSuccess() {
    return <RequestInviteSuccess onHide={this.onHide} />;
  }

  renderInviteForm() {
    return <RequestInviteForm onSubmit={this.requestInvite} />;
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.onHide}>
        {!this.props.requestSubmitted && this.renderInviteForm()}
        {this.props.requestSubmitted && this.renderInviteSuccess()}
      </Modal>
    );
  }
}

RequestInviteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  requestParams: PropTypes.object,
  errorMessage: PropTypes.string,
  requestSubmitted: PropTypes.bool.isRequired,
  submissionInProgress: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  requestParams: getRequestParams(state),
  errorMessage: getErrorMessage(state),
  requestSubmitted: getRequestSubmitted(state),
  submissionInProgress: getSubmissionInProgress(state)
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(RequestInviteModal);
