import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import SideBar from './SideBar';
import { BrowserRouter } from 'react-router-dom';

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
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

const Main = styled.div`
  flex-grow: 1;
`;
