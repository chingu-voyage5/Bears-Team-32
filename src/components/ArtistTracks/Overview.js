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
        <Popular>
          <Header>Popular</Header>
          {topTracks.map(track => (
            <Track
              type="artist"
              key={track.id}
              albumImage={track.album.images[0].url}
              trackName={track.name}
              trackDuration={track.duration_ms}
              explicit={track.explicit}
              id={track.id}
              data={track}
            />
          ))}
        </Popular>
        {albums.length > 0 && (
          <Layout header="Albums" bgColor="black">
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
        )}
        <Layout header="Singles" bgColor="#181818">
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

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;
const Popular = styled.h1`
  background: #181818;
  padding-top: 1.5rem;
`;
