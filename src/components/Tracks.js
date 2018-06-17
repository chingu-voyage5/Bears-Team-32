import React, { Component } from 'react';
import Track from './Track';
class Tracks extends Component {
  getArtists = track => {
    return track.artists.length > 1
      ? track.artists.map(artist => artist.name)
      : [track.artists[0].name];
  };

  render() {
    const { tracks, type } = this.props;
    return (
      <div>
        {tracks.map(track => (
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
      </div>
    );
  }
}

export default Tracks;
