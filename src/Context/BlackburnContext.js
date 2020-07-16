import React, { Component } from "react";
import TokenService from "../Services/token-service";
import ScoreboardApiService from "../Services/scoreboard-api-service";

const BlackBurnContext = React.createContext({
  user: {},
  error: null,
  story_id: null,
  checkpoint_ids: { checkpointArray: [], currentIndex: 0 },
  difficulty_setting: null,
  score: 0,
  bestScore: 0,
  wpm: 0,
  accuracy: 0,
  topTenScores: [],
  myScores: [],
  audio: "",
  setError: () => {},
  clearError: () => {},
  resetGameData: () => {},
  setUser: () => {},
  setAudio: () => {},
  setScore: () => {},
  getScore: () => {},
  setWpm: () => {},
  setMyBestScore: () => {},
  getMyBestScore: () => {},
  setNewBestScore: () => {},
  processLogin: () => {},
  processLogout: () => {},
  setStoryState: () => {},
  setCheckpointIds: () => {},
  getCheckpointIds: () => {},
  incrementCheckpointIndex: () => {},
  getCurrentCheckpointIndex: () => {},
  getTopTenScores: () => {},
  getMyScores: () => {},
});

export default BlackBurnContext;

export class BlackburnProvider extends Component {
  constructor(props) {
    super(props);
    const state = {
      user: {},
      error: null,
      story_id: null,
      checkpoint_ids: { checkpointArray: [], currentIndex: 0 },
      difficulty_setting: null,
      score: 0,
      bestScore: 0,
      wpm: 0,
      accuracy: 0,
      topTenScores: [],
      myScores: [],
      audio: "",
    };
    // const payload = TokenService.parseAuthToken();
    // if (payload)
    //   state.user = {
    //     id: payload.user_id,
    //     username: payload.sub,
    //   };
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
      checkpoint_ids: { checkpointArray: [], currentIndex: 0 },
      difficulty_setting: null,
      score: 0,
      bestScore: 0,
      wpm: 0,
      accuracy: 0,
    });
  };

  setAccuracy = (accuracy) => {
    this.setState({ accuracy });
  };

  setWpm = (wpm) => {
    this.setState({ wpm });
  };

  setUser = (user) => {
    this.setState({ user });
  };
  setAudio = (audio) => {
    this.setState({ audio });
  };
  setScore = (score) => {
    this.setState({ score });
  };

  getScore = () => {
    return this.state.score;
  };

  processLogin = (token) => {
    TokenService.saveAuthToken(token);
    const payload = TokenService.parseAuthToken();
    this.setUser({
      id: payload.user_id,
      username: payload.sub,
    });
  };

  processLogout = () => {
    TokenService.clearAuthToken();
    this.setUser({});
  };

  setStoryState = (story_id, difficulty_setting) => {
    this.setState({
      story_id: story_id,
      difficulty_setting: difficulty_setting,
    });
  };

  incrementCheckpointIndex = () => {
    let index = this.state.checkpoint_ids.currentIndex;
    const checkpoint_ids = this.state.checkpoint_ids;
    index++;
    if (index > this.state.checkpoint_ids.checkpointArray.length - 1) {
      checkpoint_ids.currentIndex = null;
      this.setState({ checkpoint_ids });
    } else {
      checkpoint_ids.currentIndex = index;
      this.setState({ checkpoint_ids });
    }

    return this.state.checkpoint_ids.currentIndex;
  };

  getCurrentCheckpointIndex = () => {
    return this.state.checkpoint_ids.currentIndex;
  };

  setCheckpointIds = (checkpointArray) => {
    localStorage.setItem("checkpointArray", JSON.stringify(checkpointArray));
    return new Promise((resolve) =>
      this.setState(
        {
          checkpoint_ids: {
            checkpointArray,
            currentIndex: 0,
          },
        },
        resolve
      )
    );
  };

  getCheckpointIds = () => {
    return this.state.checkpoint_ids;
  };

  getTopTenScores = () => {
    ScoreboardApiService.getAllScores("all").then((res) => {
      const outputArr = res.map((data) => {
        return {
          username: data.username,
          score: data.total_score,
          storyId: data.story_data,
          avatar: data.avatar,
        };
      });
      return this.setState({ topTenScores: outputArr });
    });
  };

  getMyScores = () => {
    ScoreboardApiService.getMyScores(this.state.user.id, "myscores").then(
      (res) => {
        const outputArr = res.map((data) => {
          return {
            score: data.total_score,
            wpm: data.avg_wpm,
            date: data.date_created,
            accuracy: data.total_accuracy,
          };
        });
        return this.setState({ myScores: outputArr });
      }
    );
  };

  getMyBestScore = () => {
    return this.state.bestScore;
  };

  setMyBestScore = () => {
    ScoreboardApiService.getMyScores(this.state.user.id, "myscores").then(
      (res) => {
        const outputArr = res.map((data) => {
          return data.total_score;
        });

        let bestScore = outputArr[0];
        outputArr.forEach(
          (score) => (bestScore = score > bestScore ? score : bestScore)
        );
        return this.setState({ bestScore });
      }
    );
  };

  setNewBestScore = (bestScore) => {
    this.setState({ bestScore });
  };

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      difficulty_setting: this.state.difficulty_setting,
      story_id: this.state.story_id,
      checkpoint_ids: this.state.checkpoint_ids,
      score: this.state.score,
      topTenScores: this.state.topTenScores,
      myScores: this.state.myScores,
      wpm: this.state.wpm,
      accuracy: this.state.accuracy,
      audio: this.state.audio,
      setAccuracy: this.setAccuracy,
      setWpm: this.setWpm,
      setError: this.setError,
      clearError: this.clearError,
      resetGameData: this.resetGameData,
      setUser: this.setUser,
      setAudio: this.setAudio,
      setScore: this.setScore,
      getScore: this.getScore,
      setNewBestScore: this.setNewBestScore,
      setMyBestScore: this.setMyBestScore,
      getMyBestScore: this.getMyBestScore,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      setStoryState: this.setStoryState,
      setCheckpointIds: this.setCheckpointIds,
      getCheckpointIds: this.getCheckpointIds,
      incrementCheckpointIndex: this.incrementCheckpointIndex,
      getCurrentCheckpointIndex: this.getCurrentCheckpointIndex,
      getTopTenScores: this.getTopTenScores,
      getMyScores: this.getMyScores,
    };
    return (
      <BlackBurnContext.Provider value={value}>
        {this.props.children}
      </BlackBurnContext.Provider>
    );
  }
}
