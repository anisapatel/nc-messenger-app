import React, { Component } from "react";
import { Router } from "@reach/router";
import MessageBoard from "./components/MessageBoard";

// Change to class component
class App extends Component {
  render() {
    return (
      <Router>
        <MessageBoard path="/messenger" />
      </Router>
    );
  }
}

export default App;
