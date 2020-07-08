import React, { Component } from "react";
import BlackBurnContext from "../../Context/BlackburnContext";

class VictoryScreen extends Component {
  static contextType = BlackBurnContext;

  renderNothing() {
    return <></>;
  }

  renderVictory() {
    return <div className="victory-message">Victory!</div>;
  }

  render() {
    return (
      <div className="victory-screen">
        {this.context.checkpoint_ids
          ? this.renderNothing()
          : this.renderVictory()}
      </div>
    );
  }
}

export default VictoryScreen;
