import React, { Component } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000");

// Change to class component
class App extends Component {
  // Add constructor to initiate
  constructor() {
    super();
    this.state = { messages: [], currentMsg: { msg: "" } };
  }

  // Function for getting text input
  onTextChange = e => {
    this.setState({ currentMsg: { msg: e.target.value } });
    console.log(this.state);
  };

  // Function for sending message to chat server
  onMessageSubmit = event => {
    event.preventDefault();
    socket.emit("chat message", this.state.currentMsg.msg);
  };

  componentDidMount() {
    socket.on("chat message", currentMsg => {
      this.setState(currentState => {
        return {
          messages: [...currentState.messages, currentMsg],
          currentMsg: { msg: "" }
        };
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <input onChange={e => this.onTextChange(e)} value={this.state.msg} />
        <button onClick={this.onMessageSubmit}>Send</button>
      </div>
    );
  }
}

export default App;
