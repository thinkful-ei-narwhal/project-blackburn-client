import React from 'react';
import './Settings.Module.css';
import Button from '../Button/Button';
import SettingsForm from '../SettingsForm/SettingsForm';
import BlackBurnContext from '../../Context/BlackburnContext';

export default class Settings extends React.Component {
  static contextType = BlackBurnContext;

  state = {
    edit: false,
  };
  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ edit: true });
  };
  handleCancel = (e) => {
    e.preventDefault();
    this.setState({ edit: false });
  };

  acceptChanges = (e) => {
    this.setState({ edit: false });
  };

  render() {
    const { user } = this.context;
    console.log(user);
    return (
      <div className="accountInfo">
        <h3>Account Info:</h3>
        {this.state.edit === false ? (
          <div className="settings-container">
            <p>Username: {user.username}</p>
            <p>Avatar: {user.avatar}</p>

            <Button
              className="set-btn edit"
              onClick={(e) => this.handleEdit(e)}
            >
              Edit
            </Button>
          </div>
        ) : (
          <SettingsForm
            cancel={this.handleCancel}
            accept={this.acceptChanges}
          />
        )}
      </div>
    );
  }
}
