import React from 'react';
import Button from '../Button/Button';
import SettingsForm from '../SettingsForm/SettingsForm';

export default class Settings extends React.Component {
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
  render() {
    return (
      <div className="accountInfo">
        <h2>Account Info:</h2>
        {this.state.edit === false ? (
          <div className="list-container">
            {' '}
            <ul>
              <li>Username:</li>
              <li>Email:</li>
              <li>Avatar:</li>
            </ul>
            <Button
              className="set-btn edit"
              onClick={(e) => this.handleEdit(e)}
            >
              Edit
            </Button>
          </div>
        ) : (
          <SettingsForm cancel={this.handleCancel} />
        )}
      </div>
    );
  }
}
