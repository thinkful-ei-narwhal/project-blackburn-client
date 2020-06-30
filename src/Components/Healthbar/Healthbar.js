import React, { Component } from "react";
import HealthIcon from "./../HealthIcon/HealthIcon";

class Healthbar extends Component {
  state = {
    health: 0
  }

  //todos:
  //Should have a function for taking damage that can be called by the type handler with params for how much damage the user takes

  sethealth = () => {
    const healthbar = [];
    for(let i = 0; i < this.state.health;i++) {
      healthbar.push(<li key={i}><HealthIcon/></li>)
    }
    return healthbar;
  }

  componentDidMount() {
    // sets it's own state too "full health"
    this.setState({health: 3});
  }

  //On render if the health state ever reaches 0, this should call the LoseScreen route
  render() {
    return (
      <div>
        <ul>
          {this.sethealth()}
        </ul>
      </div>
    );
  }
}

export default Healthbar;
