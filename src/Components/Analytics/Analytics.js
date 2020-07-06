import React from 'react';
import LineChart from './LineChart';
import { Container, Row, Col } from 'react-grid-system';

export default function Analytics(props) {
  let arrWPM = props.myScores.map((data) => {
    return data.wpm;
  });
  let avgWPM = arrWPM.reduce((a, b) => a + b, 0) / arrWPM.length;
  let scoreArr = props.myScores.map((data) => {
    return data.score;
  });
  let avgScore = scoreArr.reduce((a, b) => a + b, 0) / scoreArr.length;
  return (
    <Container>
      <Row>
        <Col sm={6}>
          <LineChart myScores={props.myScores} />
        </Col>
        <Col sm={6}>
          <div>
            {' '}
            <h3>Average Words Per Minute </h3> {avgWPM}
          </div>
          <div>
            {' '}
            <h3>Average Score </h3> {avgScore}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
