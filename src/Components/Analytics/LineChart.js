import React from 'react';
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory';
import BlackBurnContext from '../../Context/BlackburnContext';
import './LineChart.css';

export default class LineChart extends React.Component {
  static contextType = BlackBurnContext;
  scoreLogic = () => {
    const { myScores } = this.props;
    const formatData = myScores.map((data) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const newDate = new Date(data.date).toLocaleDateString('en-US', options);
      return { date: newDate, score: data.score, wpm: data.wpm };
    });
    // let filteredScore = formatData.filter((data, i) => {
    //   let topScore = {};
    //   let prevDate = 0;
    //   if (prevDate === 0 && i > 0) {
    //     prevDate = formatData[i - 1].date;
    //   }
    //   if (i - 1 >= 0 || data.date === prevDate) {
    //     prevDate = formatData[i - 1].date;
    //     let prevScore = formatData[i - 1].score;
    //     let currentScore = data.score;

    //     if (prevScore > currentScore) {
    //       topScore = prevScore;
    //     }
    //   }
    // });
    for (let i = 0; i <= formatData.length; i++) {
      let topScore = {};
      let prevIndex = formatData[i];
      let filteredScore = [];
      if (prevIndex === 0 && i > 0) {
        prevIndex = formatData[i - 1].date;
      }
      if (i - 1 >= 0 || formatData[i].date === prevIndex.date) {
        prevIndex = formatData[i - 1];
        console.log(prevIndex);
        let currentScore = formatData[i].score;

        if (prevIndex.score > currentScore) {
          topScore = prevIndex;
          console.log('i trigger', topScore);
        }
      }
      //    else {
      //     filteredScore.push(topScore);
      //      console.log(filteredScore);
      //   }
    }
  };

  render() {
    const formatData = this.props.myScores.map((data) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const newDate = new Date(data.date).toLocaleDateString('en-US', options);
      return { date: newDate, score: data.score, wpm: data.wpm };
    });
    const wpmData = formatData.map((data) => {
      return { x: data.date, y: data.wpm };
    });
    const scoreData = formatData.map((data) => {
      return { x: data.date, y: data.score };
    });
    return (
      <div className="graphs">
        {this.scoreLogic()}
        <div className="score-graph">
          <h3> Score Over Time </h3>
          <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' },
              }}
              data={scoreData}
            />
          </VictoryChart>
        </div>
        <div className="wpm-graph">
          <h3> WPM Over Time </h3>
          <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' },
              }}
              data={wpmData}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}
