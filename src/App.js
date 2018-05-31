import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import SideBar from './SideBar';
import { BrowserRouter } from 'react-router-dom';
import './CSS-reset.css';
import './Player.css';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';

import styled from 'styled-components';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SideBar />
          <Main>
            <Routes />
          </Main>
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
      </BrowserRouter>
    );
  }
}

export default App;

const Main = styled.div`
  flex-grow: 1;
`;
