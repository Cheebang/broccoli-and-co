import React, { Component } from "react";
import { Button } from "react-bootstrap";

import "./App.css";
import RequestInviteModal from "./RequestInviteModal/RequestInviteModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
        <main className="content">
          <h1>A better way to enjoy every day</h1>
          <div className="App-intro">
            <div>Be the first to know when we launch</div>
            <Button onClick={this.openModal}>Request an invite</Button>
            <RequestInviteModal
              show={this.state.showModal}
              onHide={this.closeModal}
            />
          </div>
        </main>
        <footer>
          <div>Made with love in Melbourne.</div>
          <div>&copy; 2018 Broccoli & Co</div>
        </footer>
      </div>
    );
  }
}

export default App;
