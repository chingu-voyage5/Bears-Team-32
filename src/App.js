import React, { Component } from 'react';
import './App.css';
import './CSS-reset.css';
import './Player.css';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';

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
            <div className="player__left">
              <div className="now-playing">
                <button className="control-button">
                  <FontAwesome className="control-button" name="plus" />
                </button>
              </div>
            </div>
            <div className="player__center">
              <button className="control-button">
                <FontAwesome name="random" />
              </button>
              <button className="control-button">
                <FontAwesome name="step-backward" />
              </button>
              <button className="control-button">
                <FontAwesome name="play-circle" />
              </button>
              <button className="control-button">
                <FontAwesome name="step-forward" />
              </button>
              <button className="control-button">
                <FontAwesome name="repeat" />
              </button>
            </div>
            <div className="player__right">
              <button className="control-button">
                <FontAwesome name="list-ul" />
              </button>
              <button className="control-button">
                <FontAwesome name="mobile" />
              </button>
              <button className="control-button">
                <FontAwesome name="volume-down" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
