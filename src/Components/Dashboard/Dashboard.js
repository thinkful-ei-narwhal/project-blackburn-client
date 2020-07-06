import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboard from '../Leaderboard/Leaderboard';
import Start from '../Start/Start';
import Analytics from '../Analytics/Analytics';
import Settings from '../Settings/Settings';
import './Dashboard.Module.css';
import BlackBurnContext from '../../Context/BlackburnContext';
import ScoreboardApiService from '../../Services/scoreboard-api-service';
import UserHeader from '../UserHeader/UserHeader';
import { Spring, animated } from 'react-spring/renderprops'

export default class Dashboard extends React.Component {
  static contextType = BlackBurnContext;

  state = {
    menuOpen: true,
    showHome: true,
    showLeaderboard: false,
    showAnalytics: false,
    showSettings: false,
  };
  handleLogout = (e) => {
    this.context.processLogout(e);
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
    console.log(this.state.allScores);
    const { user } = this.context;
 
    return (
      <>
        <header className= {(this.state.menuOpen) ? "dashboard-header-open" : "dashboard-header"}>
          <h2 className="user-welcome">Welcome {user.username}</h2>
          <div className = 'user-header'> <UserHeader /> </div>
        </header>
        {(!this.state.menuOpen) && <div className = 'x' onClick = {() => this.handleMenuButton()}>  &#x2192;  </div>}
       {this.state.menuOpen && <Spring 
            from = {{
                transform:
               'translate3d(400px,0,0) scale(2) '
            }} 
            to = {{
                transform:
                'translate3d(0px,0,0) scale(1) '
            }}>
            { props => <div style = {props} className={this.state.menuOpen ? 'sidenav-open' : 'sidenav'}>
            {(this.state.menuOpen) && <div className = 'x' onClick = {() => this.handleMenuButton()}> &#x2190; </div>}

            <nav className="navLinks">
                <h1 className="title">Project <br /> Blackburn</h1>
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
                <Link
                className="links"
                onClick={(e) => this.handleLogout(e)}
                to="/"
                >
                Logout
                </Link>
            </nav>
            </div>}
        </Spring>}
        <div className={this.state.menuOpen ? 'content-open' : 'content'}>
          {this.state.showHome && (
            <div>
              {' '}
              <Start />{' '}
            </div>
          )}
          {this.state.showLeaderboard && (
            <div>

              {" "}
              <Leaderboard />{" "}
            </div>
          )}
          {this.state.showAnalytics && (
                <Analytics />
              )}
          {this.state.showSettings && (
            <div>
              {' '}
              <Settings />{' '}
              <Link onClick={(e) => this.handleLogout(e)} to="/">
                Logout
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }
}
