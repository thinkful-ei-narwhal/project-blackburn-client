import React from "react";
import LineChart from "./LineChart";
import BlackBurnContext from "../../Context/BlackburnContext";
import "./Analytics.css";
export default class Analytics extends React.Component {
  static contextType = BlackBurnContext;

  componentDidMount() {
    this.context.getMyScores();
    this.context.getTopTenScores();
  }

  render() {
    let arrWPM = this.context.myScores.map((data) => {
      return data.wpm;
    });
    let avgWPM = arrWPM.reduce((a, b) => a + b, 0) / arrWPM.length;
    let roundedWPM = avgWPM.toFixed(2) === "number" ? avgWPM.toFixed(2) : 0;
    let scoreArr1 = this.context.myScores.map((data) => {
      return data.score;
    });
    // let scoreArr2 = scoreArr1
    let avgScore = scoreArr1.reduce((a, b) => a + b, 0) / scoreArr1.length;
    let bestScore = scoreArr1.length === 0 ? 0 : Math.max(...scoreArr1);
    let roundedScore =
      avgScore.toFixed(2) === "number" ? avgScore.toFixed(2) : 0;
    let accuracyArr = this.context.myScores.map((data) => {
      return data.accuracy;
    });
    let avgAccuracy =
      accuracyArr.reduce((a, b) => a + b, 0) / accuracyArr.length;
    let roundedAccuracy =
      avgAccuracy.toFixed(2) === "number" ? avgAccuracy.toFixed(2) : 0;

    return (
      <div className="analytics-container">
        <div className="graphs-container">
          <LineChart myScores={this.context.myScores} />
        </div>
        <div className="averages-container">
          <div className="averages">
            <div>
              {" "}
              <h3>Average Words Per Minute </h3> {roundedWPM}
            </div>
            <div>
              {" "}
              <h3>Average Score </h3> {roundedScore}
            </div>
          </div>
          <div className="averages">
            <div>
              {" "}
              <h3>Average Accuracy </h3> {roundedAccuracy}
            </div>
            <div>
              {" "}
              <h3>Best Score </h3> {bestScore}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
