import React, { Component } from "react";
import healthHalfIcon from "./../../Images/HeartHalfIcon.gif";
import "./HealthHalfIcon.module.css";

class HealthHalfIcon extends Component {
  render() {
    return (
      <img
        src={healthHalfIcon}
        height="40"
        width="40"
        alt="Health Half Heart"
      />
    );
  }
}

export default HealthHalfIcon;
