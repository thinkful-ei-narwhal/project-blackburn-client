import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { Input, Required, Label } from "../Form/Form";
import ApiService from "../../Services/auth-api-service";
import BlackBurnContext from "../../Context/BlackburnContext";

class RegistrationForm extends Component {
  static contextType = BlackBurnContext;
  state = {
    username: "",
    email: "",
    password: "",
    avatar: "",
    step: 0,
    error: "",
  };

  handleClick = (e) => {
    e.preventDefault();
    let step = this.state.step;
    step++;
    this.setState({ step: step });
  };
  handleBack = (e) => {
    e.preventDefault();
    let step = this.state.step;
    step--;
    this.setState({ step: step });
    this.setState({ error: "" });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password,
      avatar: this.state.avatar,
    };
    ApiService.postUser(user)
      .then((user) => this.props.history.push(`/login`))
      .catch((err) => this.setState(err));
  };
  renderUserInfo = () => {
    return (
      <div className="reg-account">
        {this.state.error !== "" && (
          <h3 className="error">{this.state.error}</h3>
        )}
        <Label htmlFor="reg-input">
          {" "}
          <Required />
          Create Username:
        </Label>
        <Input
          className="reg-input"
          onChange={(e) => this.setState({ username: e.target.value })}
          value={this.state.username}
          required
        />

        <div className="avatar-container">
          <p>Choose Avatar:</p>
          <Label htmlFor="man">
            <input
              type="radio"
              name="reg-select"
              id="man"
              className="avatar-select"
              value="/images/man.png"
              onChange={(e) => this.setState({ avatar: e.target.value })}
            />
            <img className="avatar-img" src="/images/man.png" alt="man"></img>
          </Label>
          <Label htmlFor="spy">
            <input
              type="radio"
              name="reg-select"
              id="spy"
              className="avatar-select"
              value="/images/spy.png"
              onChange={(e) => this.setState({ avatar: e.target.value })}
            />
            <img className="avatar-img" src="/images/spy.png" alt="spy"></img>
          </Label>
          <Label htmlFor="serial-killer">
            <input
              type="radio"
              name="reg-select"
              id="serial-killer"
              className="avatar-select"
              value="/images/serial-killer.png"
              onChange={(e) => this.setState({ avatar: e.target.value })}
            />
            <img
              className="avatar-img"
              src="/images/serial-killer.png"
              alt="serial-killer"
            ></img>
          </Label>
        </div>
      </div>
    );
  };
  renderPassword = () => {
    return (
      <div className="reg-account">
        <h2>Create New Account:</h2>
        {this.state.error !== "" && (
          <h3 className="error">{this.state.error}</h3>
        )}
        <Label htmlFor="reg-input">
          <Required />
          Password:
        </Label>
        <Input
          className="reg-input"
          onChange={(e) => this.setState({ password: e.target.value })}
          value={this.state.password}
          type="password"
          required
        />
        <Label htmlFor="reg-input">
          <Required />
          Re-enter Password:
        </Label>
        <Input
          className="reg-input"
          onChange={(e) => {
            this.comparePassword(e);
          }}
          type="password"
          required
        />
      </div>
    );
  };

  comparePassword = (e) => {
    if (this.state.password === e.target.value) {
      console.log("match");
      this.setState({ error: "" });
    } else this.setState({ error: "Passwords do not match" });
  };

  render() {
    return (
      <div className="reg-container">
        {this.context.error !== null && <h3>{this.context.error}</h3>}
        <form className="reg-form" onSubmit={(e) => this.handleSubmit(e)}>
          {this.state.step === 0 ? (
            <div>{this.renderUserInfo()}</div>
          ) : (
            <div>{this.renderPassword()}</div>
          )}
          {this.state.step === 0 ? (
            <Button
              className="reg-btn"
              onClick={(e) => this.handleClick(e)}
              disabled={this.state.username === ""}
            >
              Next
            </Button>
          ) : (
            <div className="btn-container">
              <Button className="reg-btn" type="submit">
                Create Account
              </Button>
              <Button
                className="reg-btn back"
                onClick={(e) => this.handleBack(e)}
              >
                Back
              </Button>
            </div>
          )}
        </form>
        <p>
          Already a member? Click{" "}
          <Link className="signup-lnk" to="/login">
            here
          </Link>{" "}
          to login
        </p>
      </div>
    );
  }
}

export default RegistrationForm;
