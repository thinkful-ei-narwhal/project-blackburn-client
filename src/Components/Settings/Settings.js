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
        <div className="settings-container">
          {this.state.edit === false ? (
            <>
              <p>
                <span className="option-setting">Username</span> <br /> <br />{' '}
                {user.username}
              </p>
              <p>
                <span className="option-setting">Avatar</span> <br /> <br />{' '}
                <img
                  src={process.env.PUBLIC_URL + user.avatar}
                  alt="User avatar"
                ></img>
              </p>

              <Button
                className="set-btn edit"
                onClick={(e) => this.handleEdit(e)}
              >
                Edit
              </Button>
            </>
          ) : (
            <SettingsForm
              cancel={this.handleCancel}
              accept={this.acceptChanges}
            />
          )}
        </div>
        <footer>
          <div className="credits-container">
            <p className="credits">
              Avatar Icons made by{' '}
              <a
                href="https://www.flaticon.com/authors/pixel-perfect"
                title="Pixel perfect"
              >
                Pixel perfect
              </a>{' '}
              from{' '}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </p>
            <p className="credits">
              Music by{' '}
              <a href="www.bensound.com" title="Bensound">
                www.bensound.com
              </a>
            </p>
            <p className="credits">
              Sound effects obtained from{' '}
              <a href="https://www.zapsplat.com" title="Zapsplat">
                https://www.zapsplat.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
