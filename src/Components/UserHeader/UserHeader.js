import React, { Component } from 'react';
import BlackBurnContext from '../../Context/BlackburnContext';

class UserHeader extends Component {
  static contextType = BlackBurnContext;

  render() {
    const { user } = this.context;
    return (
      <div className="user-info">
        <img className="user-info" src={user.avatar} alt="User Avatar"></img>
      </div>
    );
  }
}

export default UserHeader;
