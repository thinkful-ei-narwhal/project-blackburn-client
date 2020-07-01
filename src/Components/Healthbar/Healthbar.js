import React, { Component } from "react";
import HealthIcon from "./../HealthIcon/HealthIcon";

class Healthbar extends Component {
  sethealth(health) {
    const healthbar = [];
    for (let i = 0; i < health; i++) {
      healthbar.push(
        <li key={i}>
          <HealthIcon />
        </li>
      );
    }
    return healthbar;
  }

  //On render if the health state ever reaches 0, this should call the LoseScreen route
  render() {
    return (
      <div>
        <ul>{this.sethealth(this.props.health)}</ul>
      </div>
    );
  }
}

export default Healthbar;
