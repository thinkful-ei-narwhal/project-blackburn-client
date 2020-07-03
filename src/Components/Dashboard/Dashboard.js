import React from "react";
import { Link } from "react-router-dom";
import Leaderboard from "../Leaderboard/Leaderboard";
import Start from "../Start/Start";
import Analytics from "../Analytics/Analytics";
import Settings from "../Settings/Settings";
import "./Dashboard.Module.css";
import BlackBurnContext from "../../Context/BlackburnContext";
import ScoreboardApiService from "../../Services/scoreboard-api-service";

export default class Dashboard extends React.Component {
  static contextType = BlackBurnContext;

  state = {
    menuOpen: true,
    showHome: true,
    showLeaderboard: false,
    showAnalytics: false,
    showSettings: false,
    allScores: [],
    myScores: [],
  };

  handleShowHome = () => {
    if (!this.state.showHome) {
      this.setState({
        showHome: true,
        showLeaderboard: false,
        showAnalytics: false,
        showSettings: false,
      });
    }
  };

  handleMenuButton = () => {
    if (!this.state.menuOpen) {
      this.setState({ menuOpen: true });
    } else {
      this.setState({ menuOpen: false });
    }
  };

  handleShowLeaderboard = () => {
    if (!this.state.showLeaderboard) {
      this.setState({
        showHome: false,
        showLeaderboard: true,
        showAnalytics: false,
        showSettings: false,
      });
    }
  };

  handleShowAnalytics = () => {
    if (!this.state.showAnalytics) {
      this.setState({
        showHome: false,
        showLeaderboard: false,
        showAnalytics: true,
        showSettings: false,
      });
    }
  };

  handleShowSettings = () => {
    if (!this.state.showSettings) {
      this.setState({
        showHome: false,
        showLeaderboard: false,
        showAnalytics: false,
        showSettings: true,
      });
    }
  };
  componentDidMount() {
    console.log(this.context);
    const { user } = this.context;
    console.log(user);
    ScoreboardApiService.getAllScores("all").then((res) =>
      res.map((data) => {
        return this.setState({
          allScores: [
            ...this.state.allScores,
            {
              username: data.username,
              score: data.total_score,
              storyId: data.story_data,
            },
          ],
        });
      })
    );
    ScoreboardApiService.getMyScores(user.id, "myscores").then((res) =>
      res.map((data) => {
        return this.setState({
          myScores: [
            ...this.state.myScores,
            {
              score: data.total_score,
              wpm: data.avg_wpm,
              date: data.date_created,
            },
          ],
        });
      })
    );
  }
  renderEmptyScore = () => {
    return (
      <div className="empty-score">
        <p>No data recorded</p>
      </div>
    );
  };
  render() {
    console.log(this.state.myScores);
    return (
      <>
        <header className="dashboard-header-open">
          {this.state.menuOpen ? (
            <div></div>
          ) : (
            <div onClick={() => this.handleMenuButton()}> &#9776; </div>
          )}
          <h1 className="title">Project Blackburn</h1>
          <Link to={"/"} className="links">
            {" "}
            logout{" "}
          </Link>
        </header>
        <div className={this.state.menuOpen ? "sidenav-open" : "sidenav"}>
          {this.state.menuOpen ? (
            <div className="x" onClick={() => this.handleMenuButton()}>
              {" "}
            </div>
          ) : (
            <div></div>
          )}
          <nav className="navLinks">
            <div
              className={this.state.showHome ? "links-selected" : "links"}
              onClick={() => this.handleShowHome()}
            >
              {" "}
              Home{" "}
            </div>
            <div
              className={
                this.state.showLeaderboard ? "links-selected" : "links"
              }
              onClick={() => this.handleShowLeaderboard()}
            >
              {" "}
              Leaderboard{" "}
            </div>
            <div
              className={this.state.showAnalytics ? "links-selected" : "links"}
              onClick={() => this.handleShowAnalytics()}
            >
              {" "}
              Analytics{" "}
            </div>
            <div
              className={this.state.showSettings ? "links-selected" : "links"}
              onClick={() => this.handleShowSettings()}
            >
              {" "}
              Settings{" "}
            </div>
          </nav>
        </div>
        <div className={this.state.menuOpen ? "content-open" : "content"}>
          {this.state.showHome && (
            <div>
              {" "}
              <Start />{" "}
            </div>
          )}
          {this.state.showLeaderboard && (
            <div>
              {" "}
              <Leaderboard allScores={this.state.allScores} />{" "}
            </div>
          )}
          {this.state.showAnalytics && (
            <div>
              {this.state.myScores.length === 0 ? (
                <div>{this.renderEmptyScore()}</div>
              ) : (
                <Analytics myScores={this.state.myScores} />
              )}
            </div>
          )}
          {this.state.showSettings && (
            <div>
              {" "}
              <Settings />{" "}
            </div>
          )}
        </div>
      </>
    );
  }
}
