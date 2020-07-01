import React, { Component } from "react";
import healthIcon from "./../../Images/HeartIcon.gif";
import "./HealthIcon.module.css";

class HealthIcon extends Component {
  render() {
    return <img src={healthIcon} height="50" width="50" alt="Health Heart" />;
  }
}

export default HealthIcon;
