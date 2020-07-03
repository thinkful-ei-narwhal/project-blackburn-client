import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import ScoreboardApiService from "../../Services/scoreboard-api-service";
import "./WinLosePage.css";
import BlackBurnContext from "../../Context/BlackburnContext";

class WinLosePage extends Component {
  static contextType = BlackBurnContext;
  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
      victory: this.props.win,
    };
  }

  postScore() {
    const data = {
      userid: this.context.user.id,
      storyid: this.context.story_id,
      score: this.context.score,
      difficultyid: this.context.difficulty_setting,
      //   wpm: this.context.wpm,
      //   accuracy,
    };
    console.log("postScore() with data", data);
    ScoreboardApiService.postScore({ data });
  }

  handleRetryClick = () => {
    this.postScore();
    this.setState({ isShow: false });
  };

  handleNextClick = () => {
    if (this.context.incrementCheckpointIds() === null) {
      this.postScore();
      //redirect to FINAL win screen
    }
    this.setState({ isShow: false });
  };

  handleDashboardClick = () => {
    this.postScore();
    this.setState({ isShow: false });
  };

  renderWin() {
    return (
      <div className="results victory">
        <div className="results header">You're a genius bruh</div>
        <Link to={"/story"}>
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
            onClick={this.handleDashboardClick}
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
        <Link to={"/start"}>
          <Button
            className="btn results retry-btn"
            onClick={this.handleRetryClick}
          >
            Retry
          </Button>
        </Link>
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
        {!this.state.victory ? this.renderWin() : this.renderLose()}
      </div>
    );
  }
}

export default WinLosePage;
