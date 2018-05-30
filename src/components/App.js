import React, { Component } from "react";
import { Button } from "react-bootstrap";

import "./App.css";
import RequestInviteModal from "./RequestInviteModal/RequestInviteModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Broccoli & Co</h1>
        </header>
        <div>
          <h1>A better way to enjoy every day</h1>
          <div className="App-intro">
            <div>Be the first to know when we launch</div>
            <Button onClick={this.openModal.bind(this)}>
              Request an invite
            </Button>
            <RequestInviteModal
              show={this.state.showModal}
              onHide={this.closeModal.bind(this)}
            />
          </div>
        </div>
        <footer>
          <div>Made with love in Melbourne.</div>
          <div>&copy; 2018 Broccoli & Co</div>
        </footer>
      </div>
    );
  }
}

export default App;
