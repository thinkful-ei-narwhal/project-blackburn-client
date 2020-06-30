import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {
  state = { hasError: false };

  render() {
    return (
      <div className="App">
        <header>{/* ToDo */}</header>
        <main>
          <p>test</p>
          {/* <Switch></Switch> */}
        </main>
      </div>
    );
  }
}

export default App;
