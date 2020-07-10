import React, { Component } from "react";
import BlackBurnContext from "../../Context/BlackburnContext";

class UserHeader extends Component {
  static contextType = BlackBurnContext;

  render() {
    const { user } = this.context;
    return (
      <div className="user-info">
        <p className="user-info">{user.avatar}</p>
      </div>
    );
  }
}

export default UserHeader;
