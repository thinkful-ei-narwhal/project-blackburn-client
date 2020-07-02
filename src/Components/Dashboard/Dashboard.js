import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboard from '../Leaderboard/Leaderboard';
import Start from '../Start/Start';
import Analytics from '../Analytics/Analytics';
import Settings from '../Settings/Settings';
import './Dashboard.Module.css';
import BlackBurnContext from '../../Context/BlackburnContext';
import ScoreboardApiService from '../../Services/scoreboard-api-service';

export default class Dashboard extends React.Component {
  state = {
    menuOpen: true,
    showAnalytics: false,
    showLeaderboard: false,
    showSettings: false,
    showHome: true,
  };

  handleMenuButton = () => {
    if (!this.state.menuOpen) {
      this.setState({ menuOpen: true });
    } else {
      this.setState({ menuOpen: false });
    }
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
    ScoreboardApiService.getAllScores('all').then((res) =>
      res.map((data) => {
        console.log(data);
        return this.setState({
          allScores: [
            ...this.state.allScores,
            {
              username: data.username,
              score: data.score,
              storyId: data.story_id,
            },
          ],
        });
      })
    );
    ScoreboardApiService.getMyScores(1, 'myscores').then((res) =>
      res.map((data) => {
        return this.setState({
          myScores: [
            ...this.state.myScores,
            { score: data.score, wpm: data.wpm, date: data.date_created },
          ],
        });
      })
    );
  }

  render() {
    return (
      <>
        <header
          className={
            this.state.menuOpen ? 'dashboard-header-open' : 'dashboard-header'
          }
        >
          {this.state.menuOpen ? (
            <div></div>
          ) : (
            <div onClick={() => this.handleMenuButton()}> &#9776; </div>
          )}
          <h1 className="title">Project Blackburn</h1>
          <Link to={'/'} className="links">
            {' '}
            logout{' '}
          </Link>
        </header>
        <div className={this.state.menuOpen ? 'sidenav-open' : 'sidenav'}>
          {this.state.menuOpen ? (
            <div className="x" onClick={() => this.handleMenuButton()}>
              {' '}
              &times;{' '}
            </div>
          ) : (
            <div></div>
          )}
          <nav className="navLinks">
            <div
              className={this.state.showHome ? 'links-selected' : 'links'}
              onClick={() => this.handleShowHome()}
            >
              {' '}
              Home{' '}
            </div>
            <div
              className={
                this.state.showLeaderboard ? 'links-selected' : 'links'
              }
              onClick={() => this.handleShowLeaderboard()}
            >
              {' '}
              Leaderboard{' '}
            </div>
            <div
              className={this.state.showAnalytics ? 'links-selected' : 'links'}
              onClick={() => this.handleShowAnalytics()}
            >
              {' '}
              Analytics{' '}
            </div>
            <div
              className={this.state.showSettings ? 'links-selected' : 'links'}
              onClick={() => this.handleShowSettings()}
            >
              {' '}
              Settings{' '}
            </div>
          </nav>
        </div>
        <div className={this.state.menuOpen ? 'content-open' : 'content'}>
          {this.state.showHome ? (
            <div>
              {' '}
              <Start />{' '}
            </div>
          ) : (
            <div></div>
          )}
          {this.state.showLeaderboard ? (
            <div>
              {' '}
              <Leaderboard allScores={this.state.allScores} />{' '}
            </div>
          ) : (
            <div></div>
          )}
          {this.state.showAnalytics ? (
            <div>
              {' '}
              <Analytics myScores={this.state.myScores} />{' '}
            </div>
          ) : (
            <div></div>
          )}
          {this.state.showSettings ? (
            <div>
              {' '}
              <Settings />{' '}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  }
}
