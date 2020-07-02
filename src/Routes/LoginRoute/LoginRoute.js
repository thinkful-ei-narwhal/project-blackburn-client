import React, { Component } from 'react';
import './LoginRoute.css';
import LoginForm from '../../Components/LoginForm/LoginForm';
import BlackBurnContext from '../../Context/BlackburnContext';

class LoginRoute extends Component {
  static contextType = BlackBurnContext;

  render() {
    return (
      <div className="Login">
        <h2>Login:</h2>
        <LoginForm {...this.props} />
      </div>
    );
  }
}

export default LoginRoute;
