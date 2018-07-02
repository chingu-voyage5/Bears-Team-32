import React, { Component } from 'react';
import Layout from '../Layout';
import Card from '../Card';
import Track from '../Track';
import styled from 'styled-components';

class Overview extends Component {
  render() {
    const { artist, albums, singles, topTracks } = this.props;
    return (
      <div>
        <div>
          <Popular>Popular</Popular>
          {topTracks.map(track => (
            <Track
              type="artist"
              key={track.id}
              albumImage={track.album.images[0].url}
              trackName={track.name}
              trackDuration={track.duration_ms}
              explicit={track.explicit}
            />
          ))}
        </div>
        <Layout header="Albums">
          {albums.map(album => (
            <Card
              key={album.id}
              name={album.name}
              image={album.images[0].url}
              type="album"
              artists={[artist]}
            />
          ))}
        </Layout>
        <Layout header="Singles">
          {singles.map(single => (
            <Card
              key={single.id}
              name={single.name}
              image={single.images[0].url}
              type="album"
              artists={[artist]}
            />
          ))}
        </Layout>
      </div>
    );
  }
}

export default Overview;

const Popular = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;
