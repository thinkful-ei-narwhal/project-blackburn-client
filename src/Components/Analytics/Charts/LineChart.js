import React from 'react';
import { VictoryChart, VictoryLine, VictoryBar, VictoryScatter } from 'victory';
import BlackBurnContext from '../../../Context/BlackburnContext';
import './LineChart.css';
import scoreboardService from '../../../Services/scoreboard-api-service';

export default class LineChart extends React.Component {
  static contextType = BlackBurnContext;
  constructor(props) {
    super(props)
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

    //if score data .length is < 1 return a scatter plot with 1 point 
    //so it doesnt just show an empty graph on first score
    return (
      <div className="graphs">
        {this.state.error && <div className="error">{this.state.error}</div>}
        <div className="score-graph">
          <h3> Score Over Time </h3>
          {scoreData.length === 1 
            ? (<VictoryChart 
              minDomain={{y: 0}} domainPadding={20} 
              height =  {350}
              width =  {400}
              >
              <VictoryScatter
                interpolation = 'natural'
                  style={{
                    data: { stroke: '#c43a31', strokeWidth: 5} ,
                    parent: { border: '2px solid #ccc' },
                  }}
                  
                data={scoreData}
              />
            </VictoryChart>)
            : (<VictoryChart 
              minDomain={{y: 0}} domainPadding={20} 
              height =  {350}
              width =  {400}
              >
              <VictoryLine
                interpolation = 'natural'
                  style={{
                    data: { stroke: '#c43a31', strokeWidth: 5} ,
                    parent: { border: '2px solid #ccc' },
                  }}
                  
                data={scoreData}
              />
            </VictoryChart>) 
          }
          
        </div>
        <div className="wpm-graph">
          <h3> WPM Over Time </h3>
          {(wpmData.length === 1) 
          ? (
            <VictoryChart minDomain={{y: 0}} domainPadding={30}
                height =  {350}
                width =  {400}
            >
              <VictoryScatter
              interpolation = 'natural'
                style={{
                  data: { stroke: '#c43a31', strokeWidth: 5 },
                  parent: { border: '2px solid #ccc' },
                }}
                data={wpmData}
              />
            </VictoryChart>
          )
          : (
            <VictoryChart minDomain={{y: 0}} domainPadding={30}
            height =  {350}
            width =  {400}
         >
           <VictoryLine
           interpolation = 'natural'
             style={{
               data: { stroke: '#c43a31', strokeWidth: 5 },
               parent: { border: '2px solid #ccc' },
             }}
             data={wpmData}
           />
         </VictoryChart>
          )
          
          }
        </div>
      </div>

    );
  }
}
