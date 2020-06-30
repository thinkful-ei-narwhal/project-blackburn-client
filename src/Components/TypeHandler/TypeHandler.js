import React, { Component } from "react";
import { Input, Label } from "./../Form/Form";
import Button from "./../Button/Button";
import "./TypeHandler.module.css";

class TypeHandler extends Component {
  //todos:
  //handle inputs with a controlled state callback function that is passed in from challenge route
  //compares the input with the state lists and triggers their correct function if they're correct

  componentDidMount() {}

  render() {
    return (
      <div>
        {/* this form needs an onSubmit={} to call */}
        <form className="spell-checker">
          <label className="basic-label TranslateLabel" htmlFor="type-input">
          </label>
          <Input
            placeholder="Start Typing!"
            id="type-input"
            name="type-input"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

export default TypeHandler;
