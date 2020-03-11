import React, { Component } from "react";
import { Router } from "@reach/router";
import MessageBoard from "./components/MessageBoard";
import LandingPage from "./components/LandingPage";

// Change to class component
class App extends Component {
  state = { username: "", img_url: "" };

  setUserDetails = (username, img_url) => {
    this.setState({ username, img_url });
  };
  render() {
    return (
      <Router>
        <MessageBoard path="/messenger" />
        <LandingPage path="/" setUserDetails={this.setUserDetails} />
      </Router>
    );
  }
}

export default App;
