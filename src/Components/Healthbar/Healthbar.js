import React, { Component } from "react";
import HealthIcon from "./../HealthIcon/HealthIcon";
import HealthHalfIcon from "./../HealthHalfIcon/HealthHalfIcon";

class Healthbar extends Component {
  hasDecimal(num) {
    return !!(num % 1);
  }

  sethealth(health) {
    if (health > 0) {
      const healthbar = [];
      let halfHeart = false;
      if (this.hasDecimal(health)) {
        health = Math.floor(health);
        halfHeart = true;
      }

      for (let i = 0; i < health; i++) {
        healthbar.push(
          <li key={i}>
            <HealthIcon />
          </li>
        );
      }
      if (halfHeart) {
        healthbar.push(
          <li key={healthbar.length + 1}>
            <HealthHalfIcon />
          </li>
        );
      }
      return healthbar;
    } else {
      return [];
    }
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
