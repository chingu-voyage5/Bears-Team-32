import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './CSS-reset.css';
import './Player.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <footer className="playerBar-container">
          <div className="playerBar">
            <div className="player__left">left</div>
            <div className="player__center">center</div>
            <div className="player__right">right</div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
