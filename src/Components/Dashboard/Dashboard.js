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

  renderEmptyScore = () => {
    return (
      <div className="empty-score">
        <p>No data recorded</p>
      </div>
    );
  };
  render() {
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
          <h1 className="title">Project Blackburn</h1>
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
            <Link to={'/'} className="links">
                {' '}
                logout{' '}
          </Link>
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
              <Leaderboard />{" "}
            </div>
          )}
          {this.state.showAnalytics && (
            <div>
              {this.context.myScores.length === 0 ? (
                <div>{this.renderEmptyScore()}</div>
              ) : (
                <Analytics />
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
