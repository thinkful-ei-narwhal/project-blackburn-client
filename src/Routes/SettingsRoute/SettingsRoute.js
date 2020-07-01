import React, { Component } from 'react';
import './SettingsRoute.css';
import Settings from '../../Components/Settings/Settings';

class SettingsRoute extends Component {
  render() {
    return (
      <div className="Settings">
        <h2>Settings:</h2>
        <Settings />
      </div>
    );
  }
}

export default SettingsRoute;
