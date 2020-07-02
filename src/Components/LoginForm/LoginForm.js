import React, { Component } from 'react';
import Button from '../Button/Button';
import { Input, Label } from '../Form/Form';
import ApiService from '../../Services/auth-api-service';
import TokenService from '../../Services/token-service';
import BlackBurnContext from '../../Context/BlackburnContext';

class LoginForm extends Component {
  static contextType = BlackBurnContext;
  state = {
    username: '',
    error: '',
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    ApiService.postLogin({ username: username.value, password: password.value })
      .then((res) => {
        password.value = '';
        this.context.processLogin(res.authToken);
        console.log(this.context);
        this.props.history.push(`/dashboard`);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.error });
      });
  };
  render() {
    const { error } = this.state;
    return (
      <div className="login-container">
        <form className="log-form" onSubmit={(e) => this.handleSubmit(e)}>
          {error !== '' && <h3 className="error">{error}</h3>}
          <Label htmlFor="log-input username">Username:</Label>
          <Input
            className="log-input username"
            name="username"
            onChange={(e) => this.setState({ username: e.target.value })}
            value={this.state.username}
            required
          />

          <Label htmlFor="log-input password">Password:</Label>
          <Input
            className="log-input password"
            name="password"
            type="password"
            required
          />
          <Button className="log-btn" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
