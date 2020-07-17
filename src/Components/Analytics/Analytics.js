import React from 'react';
import LineChart from './Charts/LineChart';
import BlackBurnContext from '../../Context/BlackburnContext';
import './Analytics.css';
export default class Analytics extends React.Component {
  static contextType = BlackBurnContext;

  componentDidMount() {
    this.context.getMyScores();
    this.context.getTopTenScores();
  }

  render() {
    let arrWPM;
    let avgWPM;
    let roundedWPM;
    let scoreArr1;
    let avgScore;
    let bestScore;
    let roundedScore;
    let accuracyArr;
    let avgAccuracy;
    let roundedAccuracy;

    if (this.context.myScores.length === 0) {
      roundedWPM = 'No Scores Yet';
      roundedScore = 'No Scores Yet';
      roundedAccuracy = 'No Scores Yet';
      bestScore = 'No Scores Yet';
    } else {
      arrWPM = this.context.myScores.map((data) => {
        return data.wpm;
      });
      avgWPM = arrWPM.reduce((a, b) => a + b, 0) / arrWPM.length;
      roundedWPM = arrWPM.length === 1 ? arrWPM[0] : avgWPM.toFixed(2);
      scoreArr1 = this.context.myScores.map((data) => {
        return data.score;
      });
      avgScore = scoreArr1.reduce((a, b) => a + b, 0) / scoreArr1.length;
      bestScore = scoreArr1.length === 0 ? 0 : Math.max(...scoreArr1);
      roundedScore =
        scoreArr1.length === 1 ? scoreArr1[0] : avgScore.toFixed(2);
      accuracyArr = this.context.myScores.map((data) => {
        return data.accuracy;
      });
      avgAccuracy = accuracyArr.reduce((a, b) => a + b, 0) / accuracyArr.length;
      roundedAccuracy =
        accuracyArr.length === 1 ? accuracyArr[0] : avgAccuracy.toFixed(2);
    }
    return (
      <div className="analytics-container">
        <div className="graphs-container">
          <LineChart myScores={this.context.myScores} />
        </div>
        <div className="averages-container">
          <div className="averages">
            <div>
              {' '}
              <h3>Average Words Per Minute </h3> {roundedWPM}
            </div>
            <div>
              {' '}
              <h3>Average Score </h3> {roundedScore}
            </div>
          </div>
          <div className="averages">
            <div>
              {' '}
              <h3>Average Accuracy </h3> {roundedAccuracy}
            </div>
            <div>
              {' '}
              <h3>Best Score </h3> {bestScore}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
