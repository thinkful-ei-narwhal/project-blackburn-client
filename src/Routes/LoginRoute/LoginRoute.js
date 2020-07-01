import React, { Component } from 'react';
import './LoginRoute.css';
import LoginForm from '../../Components/LoginForm/LoginForm';

class LoginRoute extends Component {
  render() {
    return (
      <div className="Login">
        <h2>Login:</h2>
        <LoginForm />
      </div>
    );
  }
}

export default LoginRoute;
