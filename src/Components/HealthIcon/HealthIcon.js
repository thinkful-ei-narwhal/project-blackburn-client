import React, { Component } from "react";
import healthIcon from "./../../Images/HeartIcon.gif";
import "./HealthIcon.module.css";

class HealthIcon extends Component {
  //todos:
  //Should have a function for taking damage that can be called by the type handler with params for how much damage the user takes
  //On render if the health state ever reaches 0, this should call the LoseScreen route
  componentDidMount() {
    // sets it's own state too "full health"
  }
  render() {
    return <img src={healthIcon} height="50" width="50" alt="Health Heart" />
  }
}

export default HealthIcon;
