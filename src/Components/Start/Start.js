import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
import './Start.Module.css';
import { Transition, animated as a } from 'react-spring/renderprops'

// const pages = [
//     ({ style, history }) => (
//         <a.div style={{ ...style, background: 'lightpink' }}>
//           <div
//             onClick={() => {
//               history.push('/b')
//             }}>
//             A
//           </div>
//         </a.div>
//       )
// ]
export default class Start extends React.Component {
  render() {
    return (
      <div className = 'start-container'>
        <Container>
            <Row>
            <Col>
                <h4> Click Start to test your skills or get some help with our tutorial</h4>
            </Col>
            </Row>
            <Row>
            <Col>
                <Link to="/start" className = 'start-buttons'>
                        <button className="start-btn"> Start </button>    
                </Link>
            </Col>
            <Col>
                <div className = 'start-buttons'>
                    <button className="start-btn" > Tutorial </button>
                </div>
            </Col>
            </Row>
        </Container>
      </div>
    );
  }
}
