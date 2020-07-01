import React, { Component } from 'react';
import Button from '../Button/Button';
import { Input, Required, Label } from '../Form/Form';

class RegistrationForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    repassword: '',
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
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('I am working');
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
        <Input className="reg-input username" required />
        <Label htmlFor="avatar">Choose Avatar:</Label>
        <select className="avatar">
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
        <Input className="reg-input password" required />
        <Label htmlFor="reg-input repassword">
          <Required />
          Re-enter Password:
        </Label>
        <Input className="reg-input repassword" required />
      </div>
    );
  };

  render() {
    return (
      <div className="reg-container">
        <form className="reg-form" onSubmit={(e) => this.handleSubmit(e)}>
          {this.state.step === 0 ? (
            <div>{this.renderUserInfo()}</div>
          ) : (
            <div>{this.renderPassword()}</div>
          )}
          {this.state.step === 0 ? (
            <Button className="reg-btn" onClick={(e) => this.handleClick(e)}>
              Next
            </Button>
          ) : (
            <div className="btn-container">
              <Button className="reg-btn" onClick={(e) => this.handleBack(e)}>
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
