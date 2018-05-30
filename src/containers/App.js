import React, { Component } from "react";
import Card from "../components/Card";
// import styled from "styled-components";
import { WrapperApp, WrapperSection } from "../components/style-utils";
import Menu from "../components/Menu";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import "./App.css";

class App extends Component {
   render() {
      return (
         <div className="App">
            <WrapperApp>
               <Menu>Menu</Menu>
               <SideBar>Sidebar</SideBar>
               <WrapperSection>
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
               </WrapperSection>
               <Footer>Footer</Footer>
            </WrapperApp>
         </div>
      );
   }
}

export default App;
