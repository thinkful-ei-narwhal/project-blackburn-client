import React, { Component } from 'react';
import BlackBurnContext from '../../Context/BlackburnContext';

class UserHeader extends Component {
  static contextType = BlackBurnContext;

  render() {
    const { user } = this.context;
    return (
      <div className="user-info">
        <img height = {30} width = {30} className="user-info" src={user.avatar} alt = 'user avatar'></img>
      </div>
    );
  }
}

export default UserHeader;
