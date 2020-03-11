import React, { Component } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000");

class MessageBoard extends Component {
  state = {
    messages: [],
    currentMsg: {
      msg: ""
    }
  };

  // Function for getting text input
  onTextChange = e => {
    this.setState({
      currentMsg: {
        msg: e.target.value
        // username: this.state.currentMsg.username,
        // img_url: this.state.currentMsg.img_url
      }
    });
    console.log(this.state);
  };

  // Function for sending message to chat server
  onMessageSubmit = event => {
    const { msg } = this.state.currentMsg;
    const { username, img_url } = this.props;
    socket.emit("chat message", { msg, username, img_url });
    // this.setState({ currentMsg: this.state.currentMsg }, () => {
    //   console.log(this.state.currentMsg);
    // });
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
    console.log(this.props);
    return (
      <>
        {this.state.messages.map(message => {
          return (
            <div key={Math.random()}>
              <img className="img" src={message.img_url} alt="User avatar" />
              <p>
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
