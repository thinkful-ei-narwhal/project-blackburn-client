import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import ScoreboardApiService from "../../Services/scoreboard-api-service";
import "./WinLosePage.css";

class WinLosePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
      victory: true,
    };
  }

  postScore() {
    // const data = {
    //   userid,
    //   storyid,
    //   score,
    //   difficultyid,
    //   wpm,
    //   accuracy,
    // };
    console.log("postScore() ran");
    //ScoreboardApiService.postScore({ data });
  }

  handleRetryClick = () => {
    this.postScore();
    //this.context.restartLevel();
    console.log("retry clicked");
    this.setState({ isShow: false });
  };

  handleNextClick = () => {
    //psuedo-code
    this.postScore();
    // let currentLevel = this.context.currentLevel;
    // this.context.nextLevel(currentLevel);
    console.log("Next clicked");
    this.setState({ isShow: false });
  };

  handleDashboardClick = () => {
    this.setState({ isShow: false });
  };

  renderWin() {
    return (
      <div className="results victory">
        <div className="results header">You're a genius bruh</div>
        <Button className="btn results next-btn" onClick={this.handleNextClick}>
          Next
        </Button>
        <Link to="/dashboard">
          <Button
            className="btn results dashboard-btn"
            onClick={this.handleWinLoseClick}
          >
            Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  renderLose() {
    return (
      <div className="results defeat">
        <div className="results header">You suck and your guy died</div>
        <Button
          className="btn results retry-btn"
          onClick={this.handleRetryClick}
        >
          Retry
        </Button>
        <Link to="/dashboard">
          <Button
            className="btn results dashboard-btn"
            onClick={this.handleDashboardClick}
          >
            Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="results-div" hidden={!this.state.isShow}>
        {this.state.victory ? this.renderWin() : this.renderLose()}
      </div>
    );
  }
}

export default WinLosePage;
