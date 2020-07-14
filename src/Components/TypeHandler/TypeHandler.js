import React, { Component } from 'react';
import { Input, Label } from './../Form/Form';
import Button from './../Button/Button';
import './TypeHandler.css';

class TypeHandler extends Component {
  render() {
    return (
      <div className="type-input">
        <form
          className="spell-checker"
          onSubmit={(e) => this.props.handleSubmit(e)}
        >
          <Input
            className="type-input"
            autoComplete="off"
            autoFocus={true}
            placeholder="Start Typing!"
            id="type-input"
            name="typeInput"
            value={this.props.value}
            onChange={(e) => this.props.handleChange(e)}
            style={{ color: this.props.color }}
            aria-label="Type input"
          />
        </form>
      </div>
    );
  }
}

export default TypeHandler;
