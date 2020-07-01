import React, { Component } from "react";
import { Input, Label } from "./../Form/Form";
import Button from "./../Button/Button";
import "./TypeHandler.module.css";

class TypeHandler extends Component {
  render() {
    return (
      <div>
        <form
          className="spell-checker"
          onSubmit={(e) => this.props.handleSubmit(e)}
        >
          <label
            className="basic-label TranslateLabel"
            htmlFor="type-input"
          ></label>
          <Input
            autoComplete="off"
            placeholder="Start Typing!"
            id="type-input"
            name="typeInput"
            // onChange={(e) => this.handleTypeChange(e)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

export default TypeHandler;
