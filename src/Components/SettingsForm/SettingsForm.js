import React, { Component } from 'react';
import Button from '../Button/Button';
import { Input, Label } from '../Form/Form';
import ApiService from '../../Services/auth-api-service';
import BlackBurnContext from '../../Context/BlackburnContext';
import '../../Components/Settings/Settings.Module.css'
class SettingsForm extends Component {
  static contextType = BlackBurnContext;

  state = {
    error: '',
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, avatar } = e.target;
    let user = {
      id: this.context.user.id,
      username: username.value,
      avatar: avatar.value,
    };
    ApiService.editUser(user)
      .then((data) => {
        data.forEach((info) =>
          this.context.setUser({
            id: info.id,
            username: info.username,
            avatar: info.avatar,
          })
        );
      })
      .catch((err) => this.setState(err));
    console.log(this.context.user);
    this.props.accept();
  };

  render() {
    const { user } = this.context;
    return (
      <div className="settings-container">
        <form className="set-form" onSubmit={(e) => this.handleSubmit(e)}>
          {this.state.error !== '' && (
            <h4 className="error">{this.state.error}</h4>
          )}
          <Label className="set-label username" htmlFor="set-input username">
            Username
          </Label>
          <Input
            className="set-input username"
            name="username"
            defaultValue={user.username}
            required
          />
          <Label className="set-label" htmlFor="avatar">
            Avatar
          </Label>
          <select
            className="set-select avatar"
            name="avatar"
            defaultValue={user.avatar}
          >
            <option>Red Mage</option>
            <option>Blue Mage</option>
          </select>
          <div className="btn-container">
            <Button className="set-btn submit" type="submit">
              Accept
            </Button>
            <Button
              className="set-btn cancel"
              onClick={(e) => this.props.cancel(e)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default SettingsForm;
