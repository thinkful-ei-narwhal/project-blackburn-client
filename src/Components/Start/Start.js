import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import "./Start.Module.css";

export default class Start extends React.Component {
  state = {
    showTooltip: false,
  };

  render() {
    return (
      <div className="start-container">
        <Container>
          <Row>
            <Col>
              <h4>
                {" "}
                Click Start to test your skills or get some help with our
                tutorial
              </h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/start" className="start-buttons">
                <button className="start-btn"> Start </button>
              </Link>
            </Col>
            <Col>
              <div className="start-buttons">
                <button
                  className="start-btn"
                  onClick={() =>
                    this.setState({ showTooltip: !this.state.showTooltip })
                  }
                >
                  {" "}
                  How to Play{" "}
                </button>
              </div>
              {this.state.showTooltip && (
                <div>
                  <p>
                    Click start then select a story and a difficulty. To play
                    just start typing the words that appear on screen. But be
                    careful! For each word that disappears, you lose half a
                    heart. For each word that you mispell, you lose a whole
                    heart. Compete with your friends to get the highest score.
                  </p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
