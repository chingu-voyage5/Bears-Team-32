import React, { Component } from 'react';
import Layout from './Layout';
import Home from '../containers/Home';
import { Route, Switch, Redirect } from 'react-router-dom';
import SearchBar from './SearchBar';
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/browse/featured" />} />
        <Route path="/search/recent" render={() => <SearchBar />} />
        <Route path="/browse" component={Home} />
        <Route path="/collection/playlist" render={() => <h1>Library</h1>} />
        <Route render={() => <Layout name={'No Match'} />} />
      </Switch>
    );
  }
}

export default Routes;
