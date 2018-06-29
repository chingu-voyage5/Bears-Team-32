import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import Artist from "../components/Artist";
import Playlist from "../components/Playlist";
import Card from "../components/Card";
import Layout from "../components/Layout";

const url = "https://jffy-api.herokuapp.com/api/v1/spotify/?query";

class AlbumTracks extends Component {
   state = {
      tracks: [],
      tracksTotal: null,
      playlistImageURL: "",
      playlistDescription: "",
      playlistName: "",
      ablbumName: "",
      dataType: "",
      albumInfo: []
   };

   componentDidMount() {
      const { match } = this.props;
      const query = `https://api.spotify.com/v1/albums/${match.params.id}`;
      axios.get(`${url}=${query}`).then(({ data }) => {
         this.setState({
            tracks: data.tracks.items,
            tracksTotal: data.tracks.total,
            playlistImageURL: data.images[0].url,
            playlistDescription: data.description,
            playlistName: data.name,
            dataType: data.type,
            albumInfo: data
         });
      });
   }
   render() {
      return (
         <Playlist
            tracksTotal={this.state.tracksTotal}
            playlistImageURL={this.state.playlistImageURL}
            playlistDescription={this.state.playlistDescription}
            playlistName={this.state.playlistName}
            playlistOwner={this.state.playlistOwner}
            tracks={this.state.tracks}
            type={this.state.dataType}
            albumInfo={this.state.albumInfo}
         />
      );
   }
}

class PlaylistTracks extends Component {
   state = {
      tracks: [],
      tracksTotal: null,
      playlistImageURL: "",
      playlistDescription: "",
      playlistName: "",
      playlistOwner: "",
      ablbumName: "",
      dataType: ""
   };

   componentDidMount() {
      const { match } = this.props;
      const query = `https://api.spotify.com/v1/users/spotify/playlists/${
         match.params.id
      }`;
      axios.get(`${url}=${query}`).then(({ data }) => {
         this.setState({
            tracks: data.tracks.items,
            tracksTotal: data.tracks.total,
            playlistImageURL: data.images[0].url,
            playlistDescription: data.description,
            playlistName: data.name,
            playlistOwner: data.owner.display_name,
            dataType: data.type
         });
      });
   }

   render() {
      return (
         <Playlist
            tracksTotal={this.state.tracksTotal}
            playlistImageURL={this.state.playlistImageURL}
            playlistDescription={this.state.playlistDescription}
            playlistName={this.state.playlistName}
            playlistOwner={this.state.playlistOwner}
            tracks={this.state.tracks}
         />
      );
   }
}
class CategoriesPlaylist extends Component {
   state = {
      categoriesPlaylists: []
   };

   componentDidMount() {
      const { match } = this.props;
      const query = `https://api.spotify.com/v1/browse/categories/${
         match.params.id
      }/playlists`;
      axios.get(`${url}=${query}`).then(({ data }) => {
         console.log("CAtegories DATA", data.playlists.items);
         this.setState({ categoriesPlaylists: data.playlists.items });
      });
   }

   render() {
      return (
         <Layout header={this.props.match.params.id}>
            {this.state.categoriesPlaylists.map(item => {
               return (
                  <Link key={item.id} to={`/${item.type}/${item.id}`}>
                     <Card image={item.images[0].url} name={item.name} />
                  </Link>
               );
            })}
         </Layout>
      );
   }
}

const TrackComponents = {
   playlist: PlaylistTracks,
   artist: Artist,
   album: AlbumTracks,
   categories: CategoriesPlaylist
};

class TracksContainer extends Component {
   render() {
      const path = `/${this.props.name}/:id`;
      const Component = TrackComponents[this.props.name];
      return (
         <div>
            <Route
               path={path}
               render={props => <Component name={this.props.name} {...props} />}
            />
         </div>
      );
   }
}

export default TracksContainer;
