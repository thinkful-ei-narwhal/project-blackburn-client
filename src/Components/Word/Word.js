import React, { Component } from "react";
import "./Word.module.css";

class Word extends Component {
  state = {
    timeout: this.props.timeout,
  };

  countDown(state) {
    const newTime = state.timeout - 1;
    if (state.timeout === 0) {
      //ToDo: player takes damage
      this.props.removeWord(this.props.uniqueId);
    } else {
      this.setState({ timeout: newTime });
    }
  }

  componentDidMount() {
    setInterval(() => this.countDown(this.state), 1000);
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <p>{this.props.word}</p>
        <p>{this.state.timeout}</p>
      </div>
    );
  }
}

export default Word;
