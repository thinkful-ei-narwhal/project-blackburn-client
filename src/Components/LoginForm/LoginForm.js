import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { Input, Label } from "../Form/Form";
import ApiService from "../../Services/auth-api-service";
import BlackBurnContext from "../../Context/BlackburnContext";

class LoginForm extends Component {
  static contextType = BlackBurnContext;
  state = {
    username: "",
    error: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    ApiService.postLogin({ username: username.value, password: password.value })
      .then((res) => {
        password.value = "";
        this.context.processLogin(res.authToken);
        this.props.history.push(`/dashboard`);
      })
      .catch((err) => {
        this.setState({ error: err.error });
      });
  };
  render() {
    const { error } = this.state;
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form className="log-form" onSubmit={(e) => this.handleSubmit(e)}>
          {error !== "" && <h3 className="error">{error}</h3>}
          <Label htmlFor="log-input username">Username</Label>
          <Input
            className="log-input"
            name="username"
            onChange={(e) => this.setState({ username: e.target.value })}
            value={this.state.username}
            aria-label="Username"
            required
          />

          <Label htmlFor="password">Password</Label>
          <Input
            className="log-input"
            name="password"
            type="password"
            aria-label="Password"
            required
          />
          <Button className="log-btn" type="submit">
            Login
          </Button>
        </form>
        <p>
          Not a member? Click{" "}
          <Link className="signup-lnk" to="/registration">
            here
          </Link>{" "}
          to sign up or use our demo account
          <br />
          Username: SirDemo
          <br /> Password: Password2!
        </p>
      </div>
    );
  }
}

export default LoginForm;
