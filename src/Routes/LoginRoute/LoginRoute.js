import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginRoute.css';
import LoginForm from '../../Components/LoginForm/LoginForm';
import BlackBurnContext from '../../Context/BlackburnContext';

class LoginRoute extends Component {
  static contextType = BlackBurnContext;

  render() {
    return (
      <div className="Login">
        <Link className="login-title" to="/">
          Project <br /> Blackburn
        </Link>
        <LoginForm {...this.props} />
      </div>
    );
  }
}

export default LoginRoute;
