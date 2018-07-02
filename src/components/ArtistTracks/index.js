import React, { Component } from 'react';
import axios from 'axios';
import ArtistHeader from './ArtistHeader';
import Overview from './Overview';
import OtherResult from '../../containers/SearchResult/OtherResult';
import { Route, Switch } from 'react-router-dom';

const url = 'https://jffy-api.herokuapp.com/api/v1/spotify/?query';

class Artist extends Component {
  state = { artist: null, topTracks: null, albums: null, singles: null, relatedArtists: null };

  componentDidMount() {
    const { match } = this.props;
    const artistID = match.params.id;
    const root = this;
    Promise.all([
      this.getArtist(artistID),
      this.getTopTracks(artistID),
      this.getAlbums(artistID),
      this.getRelatedArtists(artistID),
    ]).then(function(values) {
      let [artist, topTracks, albums, relatedArtists] = values;
      const filteredAlbums = root.albumFilter(albums.data.items);
      root.setState({
        artist: artist.data,
        topTracks: topTracks.data.tracks,
        albums: filteredAlbums.album,
        singles: filteredAlbums.single,
        relatedArtists: relatedArtists.data.artists,
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

  getRelatedArtists = id => {
    const query = `https://api.spotify.com/v1/artists/${id}/related-artists`;
    return axios.get(`${url}=${query}`);
  };

  render() {
    const { artist, relatedArtists } = this.state;
    return artist ? (
      <div id={`artist-${artist.id}`}>
        <ArtistHeader artist={artist} />
        <Switch>
          <Route exact path="/artist/:id" render={() => <Overview {...this.state} />} />
          <Route
            exact
            path="/artist/:id/related"
            render={() => <OtherResult type="artist" results={relatedArtists} bgColor="none" />}
          />
        </Switch>
      </div>
    ) : null;
  }
}

export default Artist;
