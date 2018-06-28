import React, { Component } from 'react';
import Layout from '../Layout';
import Card from '../Card';
import axios from 'axios';
import ArtistHeader from './ArtistHeader';
import Track from '../Track';
import styled from 'styled-components';

const url = 'https://jffy-api.herokuapp.com/api/v1/spotify/?query';

class Artist extends Component {
  state = { artist: null, topTracks: null, albums: null, singles: null };

  componentDidMount() {
    const { match } = this.props;
    const artistID = match.params.id;
    const root = this;
    Promise.all([
      this.getArtist(artistID),
      this.getTopTracks(artistID),
      this.getAlbums(artistID),
    ]).then(function(values) {
      let artist, topTracks, albums;
      [artist, topTracks, albums] = values;
      const filteredAlbums = root.albumFilter(albums.data.items);
      root.setState({
        artist: artist.data,
        topTracks: topTracks.data.tracks,
        albums: filteredAlbums.album,
        singles: filteredAlbums.single,
      });
    });
  }

  albumFilter = ablums => {
    const album = ablums.filter(album => album.album_type === 'album');
    const single = ablums.filter(album => album.album_type === 'single');
    return { album, single };
  };

  getArtist = id => {
    const query = `https://api.spotify.com/v1/artists/${id}`;
    return axios.get(`${url}=${query}`);
  };

  getTopTracks = id => {
    const query = `https://api.spotify.com/v1/artists/${id}/top-tracks/?country=us`;
    return axios.get(`${url}=${query}`);
  };

  getAlbums = id => {
    const query = `https://api.spotify.com/v1/artists/${id}/albums/?country=us`;
    return axios.get(`${url}=${query}`);
  };

  render() {
    const { artist, albums, singles, topTracks } = this.state;
    return artist ? (
      <div id={`artist-${artist.id}`}>
        <ArtistHeader artist={artist} />
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
      </div>
    ) : null;
  }
}

export default Artist;

const Popular = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;
