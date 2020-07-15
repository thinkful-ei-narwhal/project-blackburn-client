import React, { Component } from 'react';
import Button from '../Button/Button';
import { Input, Label } from '../Form/Form';
import ApiService from '../../Services/auth-api-service';
import BlackBurnContext from '../../Context/BlackburnContext';
import '../../Components/Settings/Settings.Module.css';
class SettingsForm extends Component {
  static contextType = BlackBurnContext;

  state = {
    avatar: '',
    error: '',
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { username } = e.target;
    let user = {
      id: this.context.user.id,
      username: username.value,
      avatar: this.state.avatar,
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
    this.props.accept();
  };

  render() {
    const { user } = this.context;
    return (
      <div className="set-form-container">
        <form className="set-form" onSubmit={(e) => this.handleSubmit(e)}>
          {this.state.error !== '' && (
            <h2 className="error">{this.state.error}</h2>
          )}
          <Label className="set-label username" htmlFor="set-input username">
            Username
          </Label>
          <Input
            className="set-input username"
            name="username"
            defaultValue={user.username}
            aria-label="Username"
            required
          />
          <div className="avatar-container">
            <p>Avatar:</p>
            <Label htmlFor="man">
              <input
                type="radio"
                name="reg-select"
                id="man"
                className="avatar-select"
                value="/images/man.png"
                onChange={(e) => this.setState({ avatar: e.target.value })}
              />
              <img className="avatar-img" src="/images/man.png" alt="man"></img>
            </Label>
            <Label htmlFor="spy">
              <input
                type="radio"
                name="reg-select"
                id="spy"
                className="avatar-select"
                value="/images/spy.png"
                onChange={(e) => this.setState({ avatar: e.target.value })}
              />
              <img className="avatar-img" src="/images/spy.png" alt="spy"></img>
            </Label>
            <Label htmlFor="serial-killer">
              <input
                type="radio"
                name="reg-select"
                id="serial-killer"
                className="avatar-select"
                value="/images/serial-killer.png"
                onChange={(e) => this.setState({ avatar: e.target.value })}
              />
              <img
                className="avatar-img"
                src="/images/serial-killer.png"
                alt="serial-killer"
              ></img>
            </Label>
          </div>
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
