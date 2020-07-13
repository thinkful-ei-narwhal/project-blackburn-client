import React from 'react';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from 'victory';
import BlackBurnContext from '../../Context/BlackburnContext';
import './LineChart.css';
import scoreboardService from '../../Services/scoreboard-api-service';
import { ContinuousColorLegend } from 'react-vis';

export default class LineChart extends React.Component {
  static contextType = BlackBurnContext;
  constructor(props) {
    super(props)
    this.state = {
      sortedScores: [],
      sortedWPM: [],
      error: '',
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    scoreboardService
      .getSortedScores(this.context.user.id, 'sortdate')
      .then((res) =>
        this.setState({ sortedScores: res.score, sortedWPM: res.wpm })
      )
      .catch((err) => this.setState({ error: err.error }));

      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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
          <h3> Score Over Time </h3>
          <VictoryChart className = 'VictoryChart' 
            minDomain={{y: 0}} domainPadding={20} 
            height =  {500}
            width =  {500}
            >
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
          <h3> WPM Over Time </h3>
          <VictoryChart minDomain={{y: 0}} domainPadding={30}
             height =  {500}
             width =  {500}
          >
            <VictoryLine
            interpolation = 'natural'
              style={{
                data: { stroke: '#c43a31', strokeWidth: 6 },
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
