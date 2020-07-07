import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ChallengeRoute from './../../Routes/ChallengeRoute/ChallengeRoute';
import RegistrationRoute from '../../Routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../Routes/LoginRoute/LoginRoute';
import Dashboard from '../Dashboard/Dashboard';
import LandingPage from '../LandingPage/LandingPage';
import StartRoute from '../../Routes/StartRoute/StartRoute';
import Story from '../Story/Story';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Switch>
            <Route exact path={'/'} component={LandingPage} />
            <Route exact path={'/challenge'} component={ChallengeRoute} />
            <Route exact path={'/registration'} component={RegistrationRoute} />
            <Route exact path={'/login'} component={LoginRoute} />
            <Route exact path={'/dashboard'} component={Dashboard} />
            <Route exact path={'/storypage'} component={Story} />
            <Route exact path={'/start'} component={StartRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
