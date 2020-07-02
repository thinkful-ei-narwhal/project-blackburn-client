import React, { Component } from 'react';
import './LoginRoute.css';
import LoginForm from '../../Components/LoginForm/LoginForm';
import BlackBurnContext from '../../Context/BlackburnContext';

class LoginRoute extends Component {
  static contextType = BlackBurnContext;

  handleLoginSuccess = () => {
    console.log(this.context.user);
    this.props.history.push(`/dashboard`);
  };
  render() {
    return (
      <div className="Login">
        <h2>Login:</h2>
        <LoginForm onLogin={this.handleLoginSuccess} />
      </div>
    );
  }
}

export default LoginRoute;
