import React, { Component } from 'react';
import './RegistrationRoute.css';
import RegistrationForm from '../../Components/Registration Form/RegistrationForm';

class RegistrationRoute extends Component {
  render() {
    return (
      <div className="Registration">
        <h2>Create New Account:</h2>
        <RegistrationForm />
      </div>
    );
  }
}

export default RegistrationRoute;
