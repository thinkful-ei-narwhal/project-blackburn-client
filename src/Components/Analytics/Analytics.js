import React from 'react';
import LineChart from './LineChart';
import { Container, Row, Col } from 'react-grid-system';
import BlackBurnContext from '../../Context/BlackburnContext';
import './Analytics.css';
export default class Analytics extends React.Component {
  static contextType = BlackBurnContext;

  componentDidMount() {
    this.context.getMyScores();
    this.context.getTopTenScores();
  }

  render() {
    console.log(this.context.myScores);
    let arrWPM = this.context.myScores.map((data) => {
      return data.wpm;
    });
    let avgWPM = arrWPM.reduce((a, b) => a + b, 0) / arrWPM.length;
    let roundedWPM = avgWPM.toFixed(2);
    let scoreArr = this.context.myScores.map((data) => {
      return data.score;
    });
    let avgScore = scoreArr.reduce((a, b) => a + b, 0) / scoreArr.length;
    let roundedScore = avgScore.toFixed(2);
    return (
      <Container>
        <Row>
          <Col sm={6}>
            <LineChart myScores={this.context.myScores} />
          </Col>
          <Col sm={6}>
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
          </Col>
        </Row>
      </Container>
    );
  }
}
