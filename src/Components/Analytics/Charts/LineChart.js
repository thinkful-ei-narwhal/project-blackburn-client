import React from 'react';
import { VictoryChart, VictoryLine, VictoryScatter } from 'victory';
import BlackBurnContext from '../../../Context/BlackburnContext';
import './LineChart.css';
import scoreboardService from '../../../Services/scoreboard-api-service';

export default class LineChart extends React.Component {
  static contextType = BlackBurnContext;
  constructor(props) {
    super(props);
    this.state = {
      sortedScores: [],
      sortedWPM: [],
      error: '',
    };
  }

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

    return (
      <div className="graphs">
        {this.state.error && <div className="error">{this.state.error}</div>}
        <div className="score-graph">
          <h2> Score Over Time </h2>
          {scoreData.length === 1 ? (
            <VictoryChart
              aria-labelledby="scoreGraph"
              minDomain={{ y: 0 }}
              domainPadding={20}
              height={300}
              width={350}
            >
              {/* <title id="scoreGraph"> Score over time </title> */}
              <VictoryScatter
                interpolation="natural"
                style={{
                  data: { stroke: '#c43a31', strokeWidth: 5 },
                  parent: { border: '2px solid #ccc' },
                }}
                data={scoreData}
              />
            </VictoryChart>
          ) : (
            <VictoryChart
              aria-labelledby="scoreGraph"
              minDomain={{ y: 0 }}
              domainPadding={20}
              height={300}
              width={300}

            >
              {/* <title id="scoreGraph" standalone = 'false'> Score over time </title> */}
              <VictoryLine
                interpolation="natural"
                style={{
                  data: { stroke: '#c43a31', strokeWidth: 5 },
                  parent: { border: '2px solid #ccc' },
                }}
                data={scoreData}
              />
            </VictoryChart>
          )}
        </div>
        <div className="wpm-graph">
          <h3> WPM Over Time </h3>
          {wpmData.length === 1 ? (
            <VictoryChart
              aria-labelledby="wpmGraph"
              minDomain={{ y: 0 }}
              domainPadding={30}
              height={300}
              width={300}

            >
              {/* <title id="wpmGraph"> WPM over time </title> */}
              <VictoryScatter
                interpolation="natural"
                style={{
                  data: { stroke: '#c43a31', strokeWidth: 5 },
                  parent: { border: '2px solid #ccc' },
                }}
                data={wpmData}
              />
            </VictoryChart>
          ) : (
            <VictoryChart
              aria-labelledby="wpmGraph"
              minDomain={{ y: 0 }}
              domainPadding={30}
              height={300}
              width={300}

            >
              {/* <title id="wpmGraph"> WPM over time </title> */}
              <VictoryLine
                interpolation="natural"
                style={{
                  data: { stroke: '#c43a31', strokeWidth: 5 },
                  parent: { border: '2px solid #ccc' },
                }}
                data={wpmData}
              />
            </VictoryChart>
          )}
        </div>
      </div>
    );
  }
}
