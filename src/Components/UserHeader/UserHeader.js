import React, { Component } from 'react';
import BlackBurnContext from '../../Context/BlackburnContext';
import config from '../../config';

class UserHeader extends Component {
  static contextType = BlackBurnContext;

  render() {
    const { user } = this.context;
    return (
      <div className="user-info">
        <img
          height={30}
          width={30}
          className="user-info"
          src={config.PUBLIC_URL + user.avatar}
          alt="user avatar"
        ></img>
      </div>
    );
  }
}

export default UserHeader;
