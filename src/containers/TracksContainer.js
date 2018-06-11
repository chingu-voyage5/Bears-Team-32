import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
const url = 'http://localhost:3001/api/v1/spotify/?query';

class ArtistTracks extends Component {
  state = { tracks: [] };

  componentDidMount() {
    const { match, name } = this.props;
    const query = `https://api.spotify.com/v1/artists/${match.params.id}/top-tracks/?country=us`;
    axios.get(`${url}=${query}`).then(({ data }) => {
      this.setState({ tracks: data.tracks });
    });
  }

  render() {
    return (
      <div>
        {this.state.tracks.map(track => (
          <div key={track.id}>
            <a href={track.preview_url} target="_blank">
              {track.name}
            </a>
          </div>
        ))}
      </div>
    );
  }
}

class AlbumTracks extends Component {
  state = { tracks: [] };

  componentDidMount() {
    const { match, name } = this.props;
    const query = `https://api.spotify.com/v1/albums/${match.params.id}`;
    axios.get(`${url}=${query}`).then(({ data }) => {
      this.setState({ tracks: data.tracks.items });
    });
  }
  render() {
    return (
      <div>
        {this.state.tracks.map(track => {
          return (
            <div key={track.id}>
              <a href={track.preview_url} target="_blank">
                {track.name}
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}

class PlaylistTracks extends Component {
  state = { tracks: [] };

  componentDidMount() {
    const { match, name } = this.props;
    const query = `https://api.spotify.com/v1/users/spotify/playlists/${match.params.id}`;
    axios.get(`${url}=${query}`).then(({ data }) => {
      this.setState({ tracks: data.tracks.items });
    });
  }

  render() {
    return (
      <div>
        {this.state.tracks.map(track => (
          <div key={track.track.id}>
            <a href={track.preview_url} target="_blank">
              {track.track.name}
            </a>
          </div>
        ))}
      </div>
    );
  }
}

const TrackComponents = {
  playlist: PlaylistTracks,
  artist: ArtistTracks,
  album: AlbumTracks,
};

class TracksContainer extends Component {
  render() {
    const path = `/${this.props.name}/:id`;
    const Component = TrackComponents[this.props.name];
    return (
      <div>
        <h1>{this.props.name}</h1>
        <Route path={path} render={props => <Component name={this.props.name} {...props} />} />
      </div>
    );
  }
}

export default TracksContainer;
