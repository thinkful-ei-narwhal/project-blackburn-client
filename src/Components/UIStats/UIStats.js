import React, { Component } from "react";

class UIStats extends Component {
  render() {
    return (
      <span>
        {this.props.textBefore} {this.props.metric}{" "}
        {this.props.textAfter !== null && this.props.textAfter}
      </span>
    );
  }
}

export default UIStats;
