import React from 'react';
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory';
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
    console.log(this.state.sortedScores);
    const formatScoreDate = this.state.sortedScores.map((data) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const newDate = new Date(data.date_trunc).toLocaleDateString(
        'en-US',
        options
      );
      return { date_trunc: newDate, max: data.max };
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
      return { x: data.date_trunc, y: data.max };
    });
    const scoreData = formatScoreDate.map((data) => {
      return { x: data.date_trunc, y: data.max };
    });
    console.log(formatScoreDate);
    return (
      <div className="graphs">
        {this.state.error && <div className="error">{this.state.error}</div>}
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
