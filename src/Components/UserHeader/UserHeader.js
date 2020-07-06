import React, { Component } from 'react';
import BlackBurnContext from '../../Context/BlackburnContext';

class UserHeader extends Component {
  static contextType = BlackBurnContext;

  render() {
    const { user } = this.context;
    return (
      <div classname="user-info">
        <p className="user-info">
          {user.username} : {user.avatar}
        </p>
      </div>
    );
  }
}

export default UserHeader;