import React, { Component } from "react";

class LandingPage extends Component {
  state = {
    username: "",
    img_url: ""
  };

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="username"
          onChange={this.handleChange}
          placeholder="Your username..."
        />
        <input
          id="img_url"
          onChange={this.handleChange}
          placeholder="Your avatar url..."
        />
        <button>Start chatting!</button>
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };
}

export default LandingPage;
