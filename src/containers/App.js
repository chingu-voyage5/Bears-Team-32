import React, { Component } from 'react';
import Routes from '../components/Routes';
import Player from '../components/Player';
import SideBar from './SideBar';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <StyledApp>
          <Wrapper>
            <SideBar />
            <Main>
              <Routes />
            </Main>
          </Wrapper>
          <Player />
        </StyledApp>
      </BrowserRouter>
    );
  }
}

export default App;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Main = styled.div`
  flex-grow: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  height: 80%;
`;
