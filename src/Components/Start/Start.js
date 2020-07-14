import React from "react";
import { Link } from "react-router-dom";
import {Spring} from 'react-spring/renderprops.cjs'
import "./Start.Module.css";

export default class Start extends React.Component {
  state = {
    showTooltip: false,
  };

  render() {
    return (
      <div className="start-container">
              <h4>
                {" "}
                Click Start to test your skills or get some help with our
                tutorial
              </h4>
              <Link to="/start" className="start-buttons">
                Start
              </Link>
                <div
                  className="start-buttons"
                  onClick={() =>
                    this.setState({ showTooltip: !this.state.showTooltip })
                  }
                >
                  How To Play
              </div>
              {this.state.showTooltip && 
                <Spring from = {{opacity: 0}} to = {{opacity: 1}}>
                    {props => <p className = 'tutorial-text'
                    style = {{
                      textAlign: 'left',
                      lineHeight: 2.5,
                      ...props}}>
                    Click start then select a story and a difficulty. To play
                    just start typing the words that appear on screen. But be
                    careful! For each word that disappears, you lose half a
                    heart. For each word that you mispell, you lose a whole
                    heart. Compete with your friends to get the highest score.</p>}
                </Spring>
              }
      </div>
    );
  }
}
