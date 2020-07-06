import React, { Component } from "react";
import { render } from "@testing-library/react";
import TokenService from "../Services/token-service";
import ApiService from "../Services/auth-api-service";
import ScoreboardApiService from '../Services/scoreboard-api-service'
const BlackBurnContext = React.createContext({
  user: {},
  error: null,
  story_id: null,
  checkpoint_ids: null,
  difficulty_setting: null,
  score: 0,
  bestScore: 0,
  topTenScores: [],
  myScores: [],
  setError: () => {},
  clearError: () => {},
  resetGameData: () => {},
  setUser: () => {},
  setScore: () => {},
  getScore: () => {},
  setBestScore: () => {},
  getBestScore: () => {},
  processLogin: () => {},
  setStoryState: () => {},
  setCheckpointIds: () => {},
  getCheckpointIds: () => {},
  incrementCheckpointIndex: () => {},
  getCurrentCheckpointIndex: () => {},
  getTopTenScores: () => {},
  getMyScores: () => {}
});

export default BlackBurnContext;

export class BlackburnProvider extends Component {
  constructor(props) {
    super(props);
    const state = {
      user: {},
      error: null,
      story_id: null,
      checkpoint_ids: null,
      difficulty_setting: null,
      score: 0,
      bestScore: 0,
      topTenScores: [],
      myScores: []
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

  resetGameData = () => {
    this.setState({
      error: null,
      story_id: null,
      checkpoint_ids: null,
      difficulty_setting: null,
      score: 0,
      bestScore: 0,
    });
  };

  setUser = (user) => {
    this.setState({ user });
  };

  setScore = (score) => {
    this.setState({ score });
  };

  setBestScore = (bestScore) => {
    this.setState({ bestScore });
  };

  getScore = () => {
    return this.state.score;
  };

  getBestScore = () => {
    return this.state.bestScore;
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
      difficulty_setting: difficulty_setting,
    });
  };

  incrementCheckpointIndex = () => {
    let index = this.state.checkpoint_ids.currentIndex;
    index++;
    if (index > this.state.checkpoint_ids.checkpointArray.length - 1) {
      this.setState({ checkpoint_ids: null });
    } else {
      const checkpoint_ids = this.state.checkpoint_ids;
      checkpoint_ids.currentIndex = index;
      this.setState({ checkpoint_ids: checkpoint_ids });
    }
    return this.state.checkpoint_ids.currentIndex;
  };

  getCurrentCheckpointIndex = () => {
    return this.state.checkpoint_ids.currentIndex;
  };

  setCheckpointIds = (checkpointArray, currentIndex) => {
    this.setState({
      checkpoint_ids: {
        checkpointArray,
        currentIndex,
      },
    });
  };

  getCheckpointIds = () => {
    return this.state.checkpoint_ids;
  };

  getTopTenScores = () => {
    ScoreboardApiService.getAllScores('all')
        .then((res) => {
            const outputArr = res.map(data => {
                return ( 
                    {
                    username: data.username,
                    score: data.total_score,
                    storyId: data.story_data,
                    }
                )
            })
            return this.setState({ topTenScores: outputArr })
        })
  }

  getMyScores = () => {
    ScoreboardApiService.getMyScores(this.state.user.id, "myscores")
    .then((res) => {
        console.log('res', res)
        const outputArr = res.map(data => {
            return (
                { 
                    score: data.total_score, 
                    wpm: data.avg_wpm, 
                    date: data.date_created 
                }
            )
        })
    return this.setState({ myScores: outputArr })   
    })
    
 }

  render() {
    console.log(this.state.myScores)
    const value = {
      user: this.state.user,
      error: this.state.error,
      difficulty_setting: this.state.difficulty_setting,
      story_id: this.state.story_id,
      checkpoint_id: this.state.checkpoint_id,
      score: this.state.score,
      topTenScores: this.state.topTenScores,
      myScores: this.state.myScores,
      setError: this.setError,
      clearError: this.clearError,
      resetGameData: this.resetGameData,
      setUser: this.setUser,
      setScore: this.setScore,
      getScore: this.getScore,
      setBestScore: this.setBestScore,
      getBestScore: this.getBestScore,
      processLogin: this.processLogin,
      setStoryState: this.setStoryState,
      setCheckpointIds: this.setCheckpointIds,
      getCheckpointIds: this.getCheckpointIds,
      incrementCheckpointIndex: this.incrementCheckpointIndex,
      getCurrentCheckpointIndex: this.getCurrentCheckpointIndex,
      getTopTenScores: this.getTopTenScores,
      getMyScores: this.getMyScores
    };
    return (
      <BlackBurnContext.Provider value={value}>
        {this.props.children}
      </BlackBurnContext.Provider>
    );
  }
}
