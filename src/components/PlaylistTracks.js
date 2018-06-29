import React, { Component } from 'react';
import Playlist from './Playlist';
import axios from 'axios';
const url = 'https://jffy-api.herokuapp.com/api/v1/spotify/?query';

class PlaylistTracks extends Component {
  state = { data: null };

  componentDidMount() {
    const { match } = this.props;
    const query = `https://api.spotify.com/v1/users/spotify/playlists/${match.params.id}`;
    axios.get(`${url}=${query}`).then(({ data }) => {
      this.setState({ data });
    });
  }

  render() {
    return <Playlist data={this.state.data} />;
  }
}

export default PlaylistTracks;
