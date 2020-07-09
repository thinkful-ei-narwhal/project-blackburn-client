import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationRoute.css';
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm';

class RegistrationRoute extends Component {
  render() {
    return (
      <div className="Registration">
        <Link className="title" to="/">
          {' '}
          Project <br /> Blackburn{' '}
        </Link>
        <RegistrationForm {...this.props} />
      </div>
    );
  }
}

export default RegistrationRoute;
