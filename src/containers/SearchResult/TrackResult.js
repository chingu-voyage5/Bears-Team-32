import React, { Component } from 'react';
import Track from '../../components/Track';
import styled from 'styled-components';
class TrackResult extends Component {
  getArtists = track => {
    return track.artists.length > 1
      ? track.artists.map(artist => artist.name)
      : [track.artists[0].name];
  };

  render() {
    const { results, type } = this.props;
    return (
      <Wrapper>
        {results.map(track => (
          <Track
            type={type}
            key={track.id}
            artists={this.getArtists(track)}
            trackName={track.name}
            albumName={track.album.name}
            trackDuration={track.duration_ms}
            explicit={track.explicit}
          />
        ))}
      </Wrapper>
    );
  }
}

export default TrackResult;

const Wrapper = styled.div`
  width: 100%;
`;
