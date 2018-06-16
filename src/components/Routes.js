import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../containers/Home';
import TracksContainer from '../containers/TracksContainer';
import Search from '../containers/Search';
import Layout from './Layout';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/browse/featured" />} />
        <Route path="/search" render={() => <Search />} />
        <Route path="/browse" component={Home} />
        <Route path="/album" render={() => <TracksContainer name="album" />} />
        <Route path="/artist" render={() => <TracksContainer name="artist" />} />
        <Route path="/playlist" render={() => <TracksContainer name="playlist" />} />
        <Route path="/collection/playlist" render={() => <h1>Library</h1>} />
        <Route render={() => <Layout name={'No Match'} />} />
      </Switch>
    );
  }
}

export default Routes;
