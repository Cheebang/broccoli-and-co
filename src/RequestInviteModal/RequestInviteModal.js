import React, { Component } from "react";
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import request from "superagent";

const initialState = { name: "", email: "", confirmEmail: "", submissionInProgress: false, requestSubmitted: false };

class RequestInviteModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };

    this.onHide = this.onHide.bind(this);
    this.requestInvite = this.requestInvite.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeConfirmEmail = this.handleChangeConfirmEmail.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangeConfirmEmail(event) {
    this.setState({ confirmEmail: event.target.value });
  }

  requestInvite(event) {
    event.preventDefault();
    this.setState({submissionInProgress: true});
    request
      .post(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth"
      )
      .set("accept", "json")
      .send(this.state)
      .end((err, resp) => {
        this.setState({submissionInProgress: false});
        if (resp.ok) {
          this.setState({ requestSubmitted: true });
        }
      });
  }

  onHide() {
    this.setState({ ...initialState });
    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Request an invite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.requestInvite}>
            <FormGroup
              controlId="formBasicText"
              // validationState={this.getValidationState()}
            >
              <ControlLabel>Full name</ControlLabel>
              <FormControl
                type="text"
                value={this.state.name}
                placeholder="Enter text"
                onChange={this.handleChangeName}
                required="true"
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              // validationState={this.getValidationState()}
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="email"
                value={this.state.email}
                placeholder="Enter text"
                onChange={this.handleChangeEmail}
                required="true"
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              // validationState={this.getValidationState()}
            >
              <ControlLabel>Confirm email</ControlLabel>
              <FormControl
                type="email"
                value={this.state.confirmEmail}
                placeholder="Enter text"
                onChange={this.handleChangeConfirmEmail}
                required="true"
              />
              <FormControl.Feedback />
            </FormGroup>
            <div>{this.state.errorMessage}</div>
            {!this.state.submissionInProgress && <Button type="submit">Submit</Button>}
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default RequestInviteModal;
