import React from 'react';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from 'victory';
import BlackBurnContext from '../../Context/BlackburnContext';
import './LineChart.css';
import scoreboardService from '../../Services/scoreboard-api-service';
import { ContinuousColorLegend } from 'react-vis';

export default class LineChart extends React.Component {
  static contextType = BlackBurnContext;

  state = {
    sortedScores: [],
    sortedWPM: [],
    error: '',
  };

  componentDidMount() {
    scoreboardService
      .getSortedScores(this.context.user.id, 'sortdate')
      .then((res) =>
        this.setState({ sortedScores: res.score, sortedWPM: res.wpm })
      )
      .catch((err) => this.setState({ error: err.error }));
  }

  render() {
    const formatScoreDate = this.state.sortedScores.map((data) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const newDate = new Date(data.date_trunc).toLocaleDateString(
        'en-US',
        options
      );
      return { date_trunc: newDate, max: parseInt(data.max) };
    });
    const formatWPMDate = this.state.sortedWPM.map((data) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const newDate = new Date(data.date_trunc).toLocaleDateString(
        'en-US',
        options
      );
      return { date_trunc: newDate, max: data.max };
    });
    const wpmData = formatWPMDate.map((data) => {
      return { x: data.date_trunc, y: Math.floor(data.max) };
    });
    const scoreData = formatScoreDate.map((data) => {
      return { x: data.date_trunc, y: Math.floor(data.max) };
    });
    console.log(scoreData)
    return (
      <div className="graphs">
        <div className="score-graph">
          {/* <h3> Score Over Time </h3> */}
          <VictoryLabel x={25} y={24} style={{
              fontSize: 24
              }}
              text="Score Over Time"
            />
          <VictoryChart viewBox={".5, .5"}minDomain={{y: 0}} domainPadding={10} theme={VictoryTheme.material}>
            <VictoryLine
              interpolation = 'natural'
                style={{
                  data: { stroke: '#c43a31', strokeWidth: 6} ,
                  parent: { border: '2px solid #ccc' },
                }}
              data={scoreData}
              
            />
          </VictoryChart>
        </div>
        <div className="wpm-graph">
        <VictoryLabel x={25} y={24} style={{
            fontSize: 24
          }}
            text="WPM Over Time"
          />
          <VictoryChart minDomain={{y: 0}} domainPadding={20} theme={VictoryTheme.material}>
            <VictoryLine
            interpolation = 'natural'
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '2px solid #ccc' },
              }}
              animate = {{
                duration: 2000,
                onLoad: {duration: 1000}
              }}

              data={wpmData}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}
