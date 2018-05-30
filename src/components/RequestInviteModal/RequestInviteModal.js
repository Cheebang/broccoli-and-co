import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import request from "superagent";

import { getRequestParams } from "../../reducers/requestInviteReducer";
import RequestInviteForm from "./RequestInviteForm";

const initialState = {
  submissionInProgress: false,
  requestSubmitted: false,
  errorMessage: ""
};

class RequestInviteModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };

    this.onHide = this.onHide.bind(this);
    this.requestInvite = this.requestInvite.bind(this);
  }

  requestInvite(event) {
    event.preventDefault();
    this.setState({ submissionInProgress: true, errorMessage: "" });
    request
      .post(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth"
      )
      .set("accept", "json")
      .send(this.props.requestParams)
      .end((err, resp) => {
        this.setState({ submissionInProgress: false });
        if (resp.ok) {
          this.setState({ requestSubmitted: true });
        }
        if (resp.body.errorMessage) {
          this.setState({ errorMessage: resp.body.errorMessage });
        }
      });
  }

  onHide() {
    this.setState({ ...initialState });
    this.props.onHide();
  }

  renderForm() {
    return (
      <RequestInviteForm
        errorMessage={this.state.errorMessage}
        submissionInProgress={this.state.submissionInProgress}
        onSubmit={this.requestInvite}
      />
    );
  }

  renderSuccessfulMessage() {
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>All done!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            You will be one of the first to experience Broccoli & Co when we
            launch!
          </div>
          <Button type="button" onClick={this.onHide}>
            Ok
          </Button>
        </Modal.Body>
      </div>
    );
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.onHide}>
        {!this.state.requestSubmitted && this.renderForm()}
        {this.state.requestSubmitted && this.renderSuccessfulMessage()}
      </Modal>
    );
  }
}

RequestInviteModal.propTypes = { requestParams: PropTypes.object };

const mapStateToProps = state => ({
  requestParams: getRequestParams(state)
});

export default connect(mapStateToProps)(RequestInviteModal);
