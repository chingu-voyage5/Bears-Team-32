import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ArtistTracks from '../components/ArtistTracks';
import PlaylistTracks from '../components/PlaylistTracks';
import AlbumTracks from '../components/AlbumTracks';
import styled from 'styled-components';
const TrackComponents = {
  playlist: { comp: PlaylistTracks, bgColor: '#545442' },
  artist: { comp: ArtistTracks, bgColor: '#34565A' },
  album: { comp: AlbumTracks, bgColor: '#38332B' },
};

class TracksContainer extends Component {
  render() {
    const { name } = this.props;
    const Component = TrackComponents[name].comp;
    const bgColor = TrackComponents[name].bgColor;
    return (
      <Wrapper bgColor={bgColor}>
        <Route path={`/${name}/:id`} render={props => <Component name={name} {...props} />} />
      </Wrapper>
    );
  }
}

export default TracksContainer;

const Wrapper = styled.div`
  background: ${props => `linear-gradient(to bottom, ${props.bgColor}, rgba(0, 0, 0, 0.8))`};
  height: 100%;
  width: 100%;
  overflow: auto;
`;
