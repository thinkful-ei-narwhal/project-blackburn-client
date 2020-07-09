import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import BlackBurnContext from '../../Context/BlackburnContext';
import ScoreboardApiService from '../../Services/scoreboard-api-service';
import LeaderBoard from './../Leaderboard/Leaderboard';
import loseSound from '../../Assets/Sounds/arcade_game_fall_tone_001.mp3';
import winSound from '../../Assets/Sounds/arcade-climb_tone_001.mp3';
import './WinLosePage.css';

class WinLosePage extends Component {
  static contextType = BlackBurnContext;
  constructor(props) {
    super(props);
    this.state = {
      condition: this.props.condition,
      autoSave: this.props.autoSave,
    };
  }

  async autoSave() {
    const data = {
      user_id: this.context.user.id,
      story_data: this.context.story_id,
      total_score: this.context.score,
      avg_wpm: this.context.wpm,
      total_accuracy: this.context.accuracy,
    };
    console.log('postScore() with data', data);
    await ScoreboardApiService.postScore(data)
  
    this.setState({ autoSave: false })
    console.log(this.state.autoSave)
  }

  handleReturnToStartClick = () => {
    this.context.resetGameData();
  };

  handleNextClick = () => {
    this.context.incrementCheckpointIndex();
  };

  renderLevelWin() {
    return (
      <div className="results victory">
        <div className="results header">
          Congratulations! You beat the level.
        </div>
        <LeaderBoard />
        <Link to={'/start'}>
          <Button
            className="btn results next-btn"
            onClick={this.handleReturnToStartClick}
          >
            Return to Start
          </Button>
        </Link>
      </div>
    );
  }

  playWintone = () => {
    let winTone = new Audio(winSound);
    winTone.play()
  }


  renderWin() {
    return (
      <div className="results victory">
        {this.playWintone()}
        <div className="results header">You're a genius bruh</div>
        <Link to="/storypage">
          <Button
            className="btn results next-btn"
            onClick={this.handleNextClick}
          >
            Next
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button
            className="btn results dashboard-btn"
            onClick={this.handleReturnToStartClick}
          >
            Quit Run
          </Button>
        </Link>
      </div>
    );
  }

  playLoseTone = () => {
    let loseTone = new Audio(loseSound)
    loseTone.play()
  }

  renderLose() {
    return (
      <div className="results defeat">
        {this.playLoseTone()}
        <div className="results header">You suck and your guy died</div>
        <LeaderBoard />
        <Link to="/start">
          <Button
            className="btn results retry-btn"
            onClick={this.handleReturnToStartClick}
          >
            Return to Start
          </Button>
        </Link>
      </div>
    );
  }

  componentDidMount() {
    if (this.state.autoSave) this.autoSave();
  }

  render() {
    return (
      <div className="results-div">
        {this.state.condition === "lose" &&
          !this.state.autoSave &&
          this.renderLose()}
        {this.state.condition === "checkpoint" &&
          !this.state.autoSave &&
          this.renderWin()}
        {this.state.condition === "level_beaten" &&
          !this.state.autoSave &&
          this.renderLevelWin()}
      </div>
    );
  }
}

export default WinLosePage;
