import React, { Component } from 'react';
import Button from '../Button/Button';
import { Input, Required, Label } from '../Form/Form';

class RegistrationForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    repassword: '',
    step: 0,
    error: '',
  };

  handleClick = (e) => {
    e.preventDefault();
    let step = this.state.step;
    step++;
    this.setState({ step: step });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('I am working');
  };

  render() {
    return (
      <div className="reg-container">
        <form className="reg-form" onSubmit={(e) => this.handleSubmit(e)}>
          {this.state.step === 0 ? (
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
              <Label htmlFor="reg-input email">
                <Required />
                Enter Email:
              </Label>
              <Input className="reg-input email" required />
            </div>
          ) : this.state.step === 2 ? (
            <div className="reg-account">
              <Label>Choose Avatar:</Label>
              <select>
                <option>Red Mage</option>
                <option>Blue Mage</option>
              </select>
            </div>
          ) : (
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
          )}
          {this.state.step === 2 ? (
            <Button className="reg-btn" type="submit">
              Create Account
            </Button>
          ) : (
            <Button className="reg-btn" onClick={(e) => this.handleClick(e)}>
              Next
            </Button>
          )}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
