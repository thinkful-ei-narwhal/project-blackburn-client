import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboard from '../Leaderboard/Leaderboard';
import Start from '../Start/Start';
import Analytics from '../Analytics/Analytics';
import Settings from '../Settings/Settings';
import BlackBurnContext from '../../Context/BlackburnContext';
import UserHeader from '../UserHeader/UserHeader';
import './Dashboard.Module.css';
import { Spring, animated, Transition } from 'react-spring/renderprops';
import {
  FaBars,
  FaTimes,
  FaChartLine,
  FaChessKing,
  FaHome,
  FaCog,
} from 'react-icons/fa';
import { GiExitDoor } from 'react-icons/gi';
import ApiService from '../../Services/auth-api-service';

const pages = [
  (style) => (
    <animated.div style={{ ...style }}>
      <Start />
    </animated.div>
  ),
  (style) => (
    <animated.div style={{ ...style }}>
      <Leaderboard />
    </animated.div>
  ),
  (style) => (
    <animated.div style={{ ...style }}>
      <Analytics />
    </animated.div>
  ),
  (style) => (
    <animated.div style={{ ...style }}>
      <Settings />
    </animated.div>
  ),
];

export default class Dashboard extends React.Component {
  static contextType = BlackBurnContext;

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showHome: true,
      showLeaderboard: false,
      showAnalytics: false,
      showSettings: false,
      page: 0,
    };
  }
  componentDidMount() {
    ApiService.getUser(this.context.user.id).then((res) =>
      this.context.setUser({
        id: res.id,
        username: res.username,
        avatar: res.avatar,
      })
    );
  }
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
        page: 0,
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
        page: 1,
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
        page: 2,
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
        page: 3,
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
    const { user } = this.context;
    console.log(user);
    return (
      <>
        {!this.state.menuOpen && (
          <div className="x-closed" onClick={() => this.handleMenuButton()}>
            <FaBars />
          </div>
        )}
        <header
          className={
            this.state.menuOpen ? 'dashboard-header-open' : 'dashboard-header'
          }
        >
          <h2 className="user-welcome">Welcome {user.username}</h2>
          <div className="user-header">
            <UserHeader />
          </div>
        </header>
        {this.state.menuOpen && (
          <Spring
            from={{
              opacity: 0,
            }}
            to={{
              opacity: 1,
            }}
          >
            {(props) => (
              <div
                style={props}
                className={this.state.menuOpen ? 'sidenav-open' : 'sidenav'}
              >
                {this.state.menuOpen && (
                  <div className="x" onClick={() => this.handleMenuButton()}>
                    {' '}
                    <FaTimes />{' '}
                  </div>
                )}

                <nav className="navLinks">
                  <h1 className="title">Project Blackburn</h1>
                  <div
                    className={this.state.showHome ? 'links-selected' : 'links'}
                    onClick={() => this.handleShowHome()}
                  >
                    <FaHome />
                  </div>
                  <div
                    className={
                      this.state.showLeaderboard ? 'links-selected' : 'links'
                    }
                    onClick={() => this.handleShowLeaderboard()}
                  >
                    <FaChessKing />
                  </div>
                  <div
                    className={
                      this.state.showAnalytics ? 'links-selected' : 'links'
                    }
                    onClick={() => this.handleShowAnalytics()}
                  >
                    <FaChartLine />
                  </div>
                  <div
                    className={
                      this.state.showSettings ? 'links-selected' : 'links'
                    }
                    onClick={() => this.handleShowSettings()}
                  >
                    <FaCog />
                  </div>
                  <Link
                    className="links"
                    onClick={(e) => this.handleLogout(e)}
                    to="/"
                  >
                    <GiExitDoor />
                  </Link>
                </nav>
              </div>
            )}
          </Spring>
        )}
        <div className={this.state.menuOpen ? 'content-open' : 'content'}>
          <Transition
            native
            reset
            unique
            items={this.state.page}
            from={{ opacity: 0, height: 0 }}
            enter={{ opacity: 1, height: 'auto' }}
            leave={{ opacity: 0, height: 0 }}
          >
            {(index) => pages[index]}
          </Transition>
        </div>
      </>
    );
  }
}
