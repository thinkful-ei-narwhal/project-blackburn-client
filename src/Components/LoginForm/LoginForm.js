import React, { Component } from 'react';
import Button from '../Button/Button';
import { Input, Label } from '../Form/Form';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    error: '',
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('I am working');
  };
  render() {
    return (
      <div className="login-container">
        <form className="log-form" onSubmit={(e) => this.handleSubmit(e)}>
          {this.state.error !== '' && (
            <h3 className="error">{this.state.error}</h3>
          )}
          <Label htmlFor="log-input username">Username:</Label>
          <Input className="log-input username" required />

          <Label htmlFor="log-input password">Password:</Label>
          <Input className="log-input password" required />
          <Button className="log-btn" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
