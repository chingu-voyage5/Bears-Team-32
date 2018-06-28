import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ArtistTracks from '../components/ArtistTracks';
import PlaylistTracks from '../components/PlaylistTracks';
import AlbumTracks from '../components/AlbumTracks';

const TrackComponents = {
  playlist: PlaylistTracks,
  artist: ArtistTracks,
  album: AlbumTracks,
};

class TracksContainer extends Component {
  render() {
    const { name } = this.props;
    const Component = TrackComponents[name];
    return <Route path={`/${name}/:id`} render={props => <Component name={name} {...props} />} />;
  }
}

export default TracksContainer;
