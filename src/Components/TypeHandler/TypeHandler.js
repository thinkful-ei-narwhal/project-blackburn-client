import React, { Component } from "react";
import { Input, Label } from "./../Form/Form";
import Button from "./../Button/Button";
import "./TypeHandler.module.css";

class TypeHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  //todos:
  //On submit call the checker callback function

  handleTypeChange(event) {
    this.setState({ value: event.target.value });
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {/* this form needs an onSubmit={} to call */}
        <form
          className="spell-checker"
          onSubmit={(e) => this.props.handleSubmit(e)}
        >
          <label
            className="basic-label TranslateLabel"
            htmlFor="type-input"
          ></label>
          <Input
            placeholder="Start Typing!"
            id="type-input"
            name="typeInput"
            value={this.state.value}
            onChange={(e) => this.handleTypeChange(e)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

export default TypeHandler;
