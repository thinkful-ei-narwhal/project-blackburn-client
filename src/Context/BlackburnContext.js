import React, { Component } from 'react';
import { render } from '@testing-library/react';
import TokenService from '../Services/token-service';
import ApiService from '../Services/auth-api-service';

const BlackBurnContext = React.createContext({
  user: {},
  error: null,
  story_id: null,
  checkpoint_id: [],
  difficulty_setting: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  setStoryState: () => {},
  setCheckpointIds: () => {}
});

export default BlackBurnContext;

export class BlackburnProvider extends Component {
  constructor(props) {
    super(props);
    const state = {
      user: {},
      error: null,
      story_id: null,
      checkpoint_id:[],
      difficulty_setting: null,
    };
    const payload = TokenService.parseAuthToken();
    if (payload)
      state.user = {
        id: payload.user_id,
        username: payload.sub,
        avatar: payload.avatar,
      };
    this.state = state;
  }

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

  processLogin = (token) => {
    TokenService.saveAuthToken(token);
    const payload = TokenService.parseAuthToken();
    this.setUser({
      id: payload.user_id,
      username: payload.sub,
      avatar: payload.avatar,
    });
  };

  setStoryState = (story_id, difficulty_setting) => {
      this.setState({
          story_id: story_id,
          difficulty_setting: difficulty_setting
      })
  }

  setCheckpointIds = (checkpoint_id, currentIndex) => {
      this.setState({
          checkpoint_id: [...this.state.checkpoint_id, {checkpoint: checkpoint_id, currentIndex: currentIndex }]
      })
  }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      difficulty_setting: this.state.difficulty_setting,
      story_id: this.state.story_id,
      checkpoint_id: this.state.checkpoint_id,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      setStoryState: this.setStoryState,
      setCheckpointIds: this.setCheckpointIds
    };
    return (
      <BlackBurnContext.Provider value={value}>
        {this.props.children}
      </BlackBurnContext.Provider>
    );
  }
}
