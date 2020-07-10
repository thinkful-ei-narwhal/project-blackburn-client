import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ChallengeRoute from './../../Routes/ChallengeRoute/ChallengeRoute';
import RegistrationRoute from '../../Routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../Routes/LoginRoute/LoginRoute';
import Dashboard from '../Dashboard/Dashboard';
import LandingPageV2 from '../LandingPage/LandingpageV2';
import StartRoute from '../../Routes/StartRoute/StartRoute';
import Story from '../Story/Story';
import PrivateRoute from '../../Utilities/PrivateRoute'
import PublicOnlyRoute from '../../Utilities/PublicOnlyRoute'
class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Switch>
            <Route exact path={'/'} component={LandingPageV2} />
            <Route exact path={'/registration'} component={RegistrationRoute} />
            <Route exact path={'/login'} component={LoginRoute} />
            <PrivateRoute exact path={'/dashboard'} component={Dashboard} />
            <PrivateRoute exact path={'/challenge'} component={ChallengeRoute} />
            <PrivateRoute exact path={'/storypage'} component={Story} />
            <PrivateRoute exact path={'/start'} component={StartRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
