import React from 'react';
import './Leaderboard.Module.css';
import { Trail } from 'react-spring/renderprops.cjs';
import BlackBurnContext from '../../Context/BlackburnContext';
import { FaCrown } from 'react-icons/fa';

export default class Leaderboard extends React.Component {
  static contextType = BlackBurnContext;

  constructor(props) {
    super(props);
    this.state = {
      overall: true,
      byStory: false,
      story: 'monsters',
      width: 0,
      height: 0,
      initialized: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  handleOverallState = () => {
    if (!this.state.overall) {
      this.setState({ overall: true, byStory: false });
    }
  };

  handleByStoryState = () => {
    if (!this.state.byStory) {
      this.setState({ overall: false, byStory: true });
    }
  };

  componentDidMount() {
    Promise.all([
      this.context.getTopTenScores(),
      this.context.getMyScores(),
    ]).then(() => {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      return this.setState({ initialized: true });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  renderLeaderBoard = () => {
    if (this.state.overall) {
      return this.context.topTenScores
        .sort((a, b) => b - a)
        .slice(0, 10)
        .map((score, index) => {
          return (
            <li key={index}>
              <div className="leaderboard-list">
                <span className="username">
                  {index + 1}
                  {index + 1 === 1 ? <FaCrown style={{ margin: 6 }} /> : null}
                </span>
                {this.state.width > 800 && (
                  <div className="avatar">
                    {' '}
                    <img src={score.avatar} alt={`User avatar`} />{' '}
                  </div>
                )}
                <span
                  className="username"
                  style={
                    this.context.user.username === score.username
                      ? { color: 'red' }
                      : { color: 'black' }
                  }
                >
                  {score.username}
                </span>
                {/* <span className = 'score'> {(this.context.user.username === score.username) ? <FaCrown /> : null }</span> */}
                <span className="score"> {score.score} </span>
              </div>
            </li>
          );
        });
    }
  };

  handleOption = (e) => {
    this.setState({
      story: e.target.value,
    });
  };

  render() {
    const myScoreArr = this.context.myScores.map((score) => score.score);
    const maxMyScore = Math.max(...myScoreArr);
    return (
      this.state.initialized === true && (
        <div
          className="leaderboard"
          style={{ maxheight: this.props.maxHeight }}
        >
          <div className="leaderboard-header">
            <h2> Leader Board </h2>
          </div>
          <ul className="list-container">
            <li
              key={'topscore'}
              className="leaderboard-list"
              style={{ marginBottom: '10px' }}
            >
              <span className="username"> Your Top Score </span>
              {this.state.width > 800 && (
                <div className="avatar">
                  {' '}
                  <img
                    src={this.context.user.avatar}
                    alt={this.context.user.id}
                  />{' '}
                </div>
              )}
              <span className="username"> {this.context.user.username} </span>
              <span className="score">
                {maxMyScore === -Infinity ? 'No Scores' : maxMyScore}
              </span>
            </li>
            {this.renderLeaderBoard()}
          </ul>
        </div>
      )
    );
  }
}
