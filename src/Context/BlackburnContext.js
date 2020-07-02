
import React, { Component } from 'react';
import { render } from '@testing-library/react';
import TokenService from '../Services/token-service';
import ApiService from '../Services/auth-api-service';

const BlackBurnContext = React.createContext({
  user: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
});

export default BlackBurnContext;

export class BlackburnProvider extends Component {

  state = {
    user: {},
    error: null,
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    const value = {
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
    };
    return (
      <BlackBurnContext.Provider value={value}>
        {this.props.children}
      </BlackBurnContext.Provider>
    );
  }
}
