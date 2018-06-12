import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
// const url = 'http://localhost:3001/api/v1/spotify/?query';
const url = 'https://jffy-api.herokuapp.com/api/v1/spotify/?query';

class ArtistTracks extends Component {
  state = { tracks: [] };

  componentDidMount() {
    const { match } = this.props;
    const query = `https://api.spotify.com/v1/artists/${match.params.id}/top-tracks/?country=us`;
    axios.get(`${url}=${query}`).then(({ data }) => {
      this.setState({ tracks: data.tracks });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.tracks.map(track => (
          <a href={track.preview_url} target="_blank" key={track.id}>
            {track.name}
          </a>
        ))}
      </React.Fragment>
    );
  }
}

class AlbumTracks extends Component {
  state = { tracks: [] };

  componentDidMount() {
    const { match } = this.props;
    const query = `https://api.spotify.com/v1/albums/${match.params.id}`;
    axios.get(`${url}=${query}`).then(({ data }) => {
      this.setState({ tracks: data.tracks.items });
    });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.tracks.map(track => (
          <a href={track.preview_url} target="_blank" key={track.id}>
            {track.name}
          </a>
        ))}
      </React.Fragment>
    );
  }
}

class PlaylistTracks extends Component {
  state = { tracks: [] };

  componentDidMount() {
    const { match } = this.props;
    const query = `https://api.spotify.com/v1/users/spotify/playlists/${match.params.id}`;
    axios.get(`${url}=${query}`).then(({ data }) => {
      this.setState({ tracks: data.tracks.items });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.tracks.map(track => (
          <a href={track.preview_url} target="_blank" key={track.track.id}>
            {track.track.name}
          </a>
        ))}
      </React.Fragment>
    );
  }
}

const TrackComponents = {
  playlist: PlaylistTracks,
  artist: ArtistTracks,
  album: AlbumTracks,
};

const Tracks = styled.div`
  display: flex;
  flex-direction: column;
`;

class TracksContainer extends Component {
  render() {
    const path = `/${this.props.name}/:id`;
    const Component = TrackComponents[this.props.name];
    return (
      <div>
        <h1>{this.props.name}</h1>
        <Tracks>
          <Route path={path} render={props => <Component name={this.props.name} {...props} />} />
        </Tracks>
      </div>
    );
  }
}

export default TracksContainer;
