import React from 'react'
import { Container, Row, Col } from 'react-grid-system';
import './Start.Module.css'
export default class Start extends React.Component {

    render() {
        return (
            <Container>
            <Row>
              <Col >
                <p> Click start to begin playing</p>
                <button> Start </button> 
             </Col>
              <Col >
                <p>If You need a tutorial click here</p>
                <button> Tutorial </button> 
              </Col>
            </Row>
          </Container>
        )
    }
}