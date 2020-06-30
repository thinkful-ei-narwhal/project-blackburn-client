import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ChallengeRoute from "./../../Routes/ChallengeRoute/ChallengeRoute";
import Dashboard from '../Dashboard/Dashboard'
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>{/* ToDo */}</header>
        <main>
          <Switch>
            <Route exact path={"/dashboard"} component={Dashboard} />
            <Route exact path={"/challenge"} component={ChallengeRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
