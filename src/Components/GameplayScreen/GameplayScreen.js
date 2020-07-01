import React, { Component } from "react";
import gameplayImg from "./../../Images/DetectiveAtDesk.jpg";

class GameplayScreen extends Component {
  //todos:
  //Show the gameplay screenshot

  componentDidMount() {}

  render() {
    return (
      <div>
        <img src={gameplayImg} height="400" width="300" alt="Gameplay image" />
      </div>
    );
  }
}

export default GameplayScreen;
