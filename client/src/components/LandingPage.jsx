import React, { Component } from "react";
import { Link } from "@reach/router";

class LandingPage extends Component {
  state = {
    username: "",
    img_url: ""
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          required
          id="username"
          onChange={this.handleChange}
          placeholder="Your username..."
        />
        <input
          required
          id="img_url"
          onChange={this.handleChange}
          placeholder="Your avatar url..."
        />

        <button type="submit">Add User Details</button>
        <Link to="/messenger">
          <button>Start chatting</button>
        </Link>
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, img_url } = this.state;
    this.props.setUserDetails(username, img_url);
  };

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };
}

export default LandingPage;
