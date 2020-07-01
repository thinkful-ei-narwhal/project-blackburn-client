import React, { Component } from 'react';
import Button from '../Button/Button';
import { Input, Label } from '../Form/Form';

class SettingsForm extends Component {
  state = {
    username: '',
    email: '',
    avatar: '',
    error: '',
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('I am working');
  };
  render() {
    return (
      <div className="settings-container">
        <form className="set-form" onSubmit={(e) => this.handleSubmit(e)}>
          {this.state.error !== '' && (
            <h4 className="error">{this.state.error}</h4>
          )}
          <Label htmlFor="set-input username">Username:</Label>
          <Input className="set-input username" required />

          <Label htmlFor="set-input email">Email:</Label>
          <Input className="set-input email" required />
          <Label htmlFor="avatar">Avatar:</Label>
          <select className="avatar">
            <option>Red Mage</option>
            <option>Blue Mage</option>
          </select>
          <Button className="set-btn submit" type="submit">
            Accept
          </Button>
          <Button
            className="set-btn cancel"
            onClick={(e) => this.props.cancel(e)}
          >
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

export default SettingsForm;
