import React, { Component } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000");

class MessageBoard extends Component {
  state = {
    messages: [],
    currentMsg: {
      msg: "",
      username: "Jim",
      img_url:
        "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
    }
  };

  // Function for getting text input
  onTextChange = e => {
    this.setState({
      currentMsg: {
        msg: e.target.value,
        username: this.state.currentMsg.username,
        img_url: this.state.currentMsg.img_url
      }
    });
    console.log(this.state);
  };

  // Function for sending message to chat server
  onMessageSubmit = event => {
    socket.emit("chat message", this.state.currentMsg);
    this.setState({ currentMsg: this.state.currentMsg }, () => {
      console.log(this.state.currentMsg);
    });
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
          return (
            <div>
              <img className="img" src={message.img_url} />
              <p key={Math.random()}>
                {message.username}:{message.msg}
              </p>
            </div>
          );
        })}
        <div>
          <input
            onChange={e => this.onTextChange(e)}
            value={this.state.currentMsg.msg}
          />
          <button onClick={this.onMessageSubmit}>Send</button>
        </div>
      </>
    );
  }
}

export default MessageBoard;
