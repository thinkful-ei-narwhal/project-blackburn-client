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
    return (
      <div className="accountInfo">
        <h1 className="setting-header">Personal Info</h1>
        {this.state.edit === false ? (
          <div className="settings-container">
            <p>
              <span className="option-setting">Username</span> <br /> <br />{' '}
              {user.username}
            </p>
            <p>
              <span className="option-setting">Avatar</span> <br /> <br />{' '}
              <img src={user.avatar} alt="User avatar"></img>
            </p>

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
