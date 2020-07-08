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

  autoSave() {
    const data = {
      user_id: this.context.user.id,
      story_data: this.context.story_id,
      total_score: this.context.score,
      avg_wpm: this.context.wpm,
      total_accuracy: this.context.accuracy,
    };
    console.log('postScore() with data', data);
    ScoreboardApiService.postScore(data).then(() =>
      this.setState({ autoSave: false })
    );
  }

  handleReturnToStartClick = () => {
    this.context.resetGameData();
  };

  handleNextClick = () => {
    this.context.incrementCheckpointIds();
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

  renderWin() {
    let winTone = new Audio(winSound);

    return (
      <div className="results victory">
        {winTone.play()}
        <div className="results header">You're a genius bruh</div>
        <Link to="/story">
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

  renderLose() {
    let loseTone = new Audio(loseSound);
    return (
      <div className="results defeat">
        {loseTone.play()}
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

  renderFinalVictory() {
    return <div className="final-victory">Victory!</div>;
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
        {this.state.condition === "final_victory" &&
          !this.state.autoSave &&
          this.renderFinalVictory()}
      </div>
    );
  }
}

export default WinLosePage;
