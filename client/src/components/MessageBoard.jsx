import React, { Component } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000");

class MessageBoard extends Component {
  state = { messages: [], currentMsg: { msg: "" } };

  // Function for getting text input
  onTextChange = e => {
    this.setState({ currentMsg: { msg: e.target.value } });
    console.log(this.state);
  };

  // Function for sending message to chat server
  onMessageSubmit = event => {
    socket.emit("chat message", this.state.currentMsg.msg);
    this.setState({ currentMsg: { msg: "" } });
  };

  componentDidMount() {
    socket.on("chat message", currentMsg => {
      this.setState(
        currentState => {
          return {
            messages: [...currentState.messages, currentMsg]
          };
        },
        () => {
          console.log(this.state.messages);
        }
      );
    });
  }
  render() {
    return (
      <>
        {this.state.messages.map(message => {
          return <p>{message}</p>;
        })}
        <div>
          <input onChange={e => this.onTextChange(e)} value={this.state.msg} />
          <button onClick={this.onMessageSubmit}>Send</button>
        </div>
      </>
    );
  }
}

export default MessageBoard;
