import React, { Component } from "react";
import { Route } from "react-router-dom";
import ArtistTracks from "../components/ArtistTracks";
// import Artist from "../components/Artist";
import PlaylistTracks from "../components/PlaylistTracks";
import AlbumTracks from "../components/AlbumTracks";
import CategoriesPlaylist from "../components/CategoriesPlaylist";

const TrackComponents = {
   playlist: PlaylistTracks,
   artist: ArtistTracks,
   album: AlbumTracks,
   categories: CategoriesPlaylist
};

class TracksContainer extends Component {
   render() {
      const { name } = this.props;
      const Component = TrackComponents[name];
      return (
         <Route
            path={`/${name}/:id`}
            render={props => <Component name={name} {...props} />}
         />
      );
   }
}

export default TracksContainer;
