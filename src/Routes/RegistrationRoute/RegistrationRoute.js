import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationRoute.css';
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm';

class RegistrationRoute extends Component {
  render() {
    return (
      <div className="Registration">
        <h1>
          <Link className="reg-title" to="/">
            {' '}
            Project <br /> Blackburn{' '}
          </Link>
        </h1>
        <RegistrationForm {...this.props} />
      </div>
    );
  }
}

export default RegistrationRoute;
