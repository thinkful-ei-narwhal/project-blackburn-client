import React, { Component } from 'react';
import Button from '../Button/Button';
import { Input, Required, Label } from '../Form/Form';
import ApiService from '../../Services/auth-api-service';
import BlackBurnContext from '../../Context/BlackburnContext';

class RegistrationForm extends Component {
  static contextType = BlackBurnContext;
  state = {
    username: '',
    email: '',
    password: '',
    avatar: '',
    step: 0,
    error: '',
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
    this.setState({ error: '' });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password,
      avatar: this.state.avatar,
    };
    console.log(user);
    ApiService.postUser(user)
      .then((usert) => this.props.history.push(`/login`))
      .catch((err) => this.setState(err));
  };
  renderUserInfo = () => {
    return (
      <div className="reg-account">
        {this.state.error !== '' && (
          <h3 className="error">{this.state.error}</h3>
        )}
        <Label htmlFor="reg-input username">
          {' '}
          <Required />
          Create Username:
        </Label>
        <Input
          className="reg-input username"
          onChange={(e) => this.setState({ username: e.target.value })}
          value={this.state.username}
          required
        />
        <Label htmlFor="avatar">Choose Avatar:</Label>
        <select
          className="avatar"
          onChange={(e) => this.setState({ avatar: e.target.value })}
          value={this.state.avatar}
        >
          <option value="" defaultValue />
          <option>Red Mage</option>
          <option>Blue Mage</option>
        </select>
      </div>
    );
  };
  renderPassword = () => {
    return (
      <div className="reg-account">
        {this.state.error !== '' && (
          <h3 className="error">{this.state.error}</h3>
        )}
        <Label htmlFor="reg-input password">
          <Required />
          Password:
        </Label>
        <Input
          className="reg-input password"
          onChange={(e) => this.setState({ password: e.target.value })}
          value={this.state.password}
          type="password"
          required
        />
        <Label htmlFor="reg-input repassword">
          <Required />
          Re-enter Password:
        </Label>
        <Input
          className="reg-input repassword"
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
      console.log('match');
      this.setState({ error: '' });
    } else this.setState({ error: 'Passwords do not match' });
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
              disabled={this.state.username === ''}
            >
              Next
            </Button>
          ) : (
            <div className="btn-container">
              <Button
                className="reg-btn back"
                onClick={(e) => this.handleBack(e)}
              >
                Back
              </Button>
              <Button className="reg-btn" type="submit">
                Create Account
              </Button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
