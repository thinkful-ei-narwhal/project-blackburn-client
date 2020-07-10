import React, { Component } from 'react';
import gameplayImg from './../../Images/DetectiveAtDesk.jpg';

class GameplayScreen extends Component {
  render() {
    return (
      <div>
        <img src={gameplayImg} height="400" width="300" alt="Gameplay" />
      </div>
    );
  }
}

export default GameplayScreen;
