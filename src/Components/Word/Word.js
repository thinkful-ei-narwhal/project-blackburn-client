import React, { Component } from "react";
import "./Word.css";

class Word extends Component {
  constructor(props) {
    super(props);
    this.state = { timer: this.props.timer / 1000 };
  }

  //errors wher rendering a countdown timer for separate word components
  // countDown(state) {
  //   if (state.timer > 0)
  //     this.setState({ timer: this.state.timer - 1 });
  // }

  // componentDidMount() {
  //   setInterval(() => this.countDown(this.state), 1000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    return (
      <div>
        <p className = 'word' style = {{fontSize: '24px'}}>{this.props.word}</p>
        {/* <p>{this.state.timer}</p> */}
      </div>
    );
  }
}

export default Word;
