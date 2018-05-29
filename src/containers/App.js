import React, { Component } from "react";
import Card from "../components/Card";
// import styled from "styled-components";
import { AppWrapper } from "../components/style-utils";
import "./App.css";

class App extends Component {
   render() {
      return (
         <div className="App">
            <h1>Hello!</h1>
            <aside />
            <menu />
            <AppWrapper>
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
            </AppWrapper>
         </div>
      );
   }
}

export default App;
