import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import styled, { consolidateStreamedStyles } from "styled-components";
import Playlist from "../components/Playlist";
import Card from "../components/Card";
import ButtonPrimary from "../components/ButtonPrimary";

// const url = 'http://localhost:3001/api/v1/spotify/?query';
const url = "https://jffy-api.herokuapp.com/api/v1/spotify/?query";

class ArtistTracks extends Component {
   state = { tracks: [] };

   componentDidMount() {
      const { match } = this.props;
      const query = `https://api.spotify.com/v1/artists/${
         match.params.id
      }/top-tracks/?country=us`;
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

///////////////////////////////
/// Playlist START
///////////////////////////////

const PlaylistContainer = styled.section`
   display: grid;
   grid-template-columns: 30% 1fr;
`;

const CardWrapper = styled.div`
   grid-column: 1/2;
   margin-top: 4rem;
`;

const TracksWrapper = styled.div`
   grid-column: 2/3;
`;

const Paragraph = styled.p`
   padding: 0.5rem 0;
   font-weight: 400;
   color: rgba(255, 255, 255, 0.6);
   font-size: 0.8rem;
`;

class PlaylistTracks extends Component {
   state = {
      tracks: [],
      playlistInfo: [],
      tracksTotal: null,
      albumImageURL: "",
      playlistOwner: ""
   };

   componentDidMount() {
      const { match } = this.props;
      const query = `https://api.spotify.com/v1/users/spotify/playlists/${
         match.params.id
      }`;
      axios.get(`${url}=${query}`).then(({ data }) => {
         console.log("track list: ", data);
         this.setState({
            tracks: data.tracks.items,
            playlistInfo: data,
            tracksTotal: data.tracks.total,
            albumImageURL: data.images[0].url,
            playlistOwner: data.owner.display_name
         });
      });
   }

   render() {
      const { description, name, type, tracks } = this.state.playlistInfo;
      console.log("state destructured: ", description, name, type, tracks);
      console.log("total: ", this.state.tracksTotal);

      const tracksPlaylist = this.state.tracks.map(track => {
         let artists = [];
         if (track.track.artists.length > 1) {
            track.track.artists.map(artist => {
               artists.push(artist.name);
            });
         } else {
            artists = [track.track.artists[0].name];
         }

         return (
            <Playlist
               name={name}
               key={track.track.id}
               artists={artists}
               trackName={track.track.name}
               albumName={track.track.album.name}
               trackDuration={track.track.duration_ms}
               explicit={track.track.explicit}
            />
         );
      });

      return (
         <PlaylistContainer>
            <CardWrapper>
               <Card
                  noshadow="true"
                  big="true"
                  image={this.state.albumImageURL}
                  name={name}
               />
               <Paragraph>{this.state.playlistOwner}</Paragraph>
               <Paragraph>{description}</Paragraph>
               <Paragraph>{this.state.tracksTotal} Songs</Paragraph>
               <ButtonPrimary>Play</ButtonPrimary>
            </CardWrapper>
            <TracksWrapper>{tracksPlaylist}</TracksWrapper>
         </PlaylistContainer>
         // <React.Fragment>
         //    {this.state.tracks.map(track => (
         //          <a href={track.preview_url} target="_blank" key={track.track.id}>
         //             {track.track.name}
         //          </a>
         //       ))}
         // </React.Fragment>
      );
   }
}

///////////////////////////////
/// Playlist END
///////////////////////////////

const TrackComponents = {
   playlist: PlaylistTracks,
   artist: ArtistTracks,
   album: AlbumTracks
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
               <Route
                  path={path}
                  render={props => (
                     <Component name={this.props.name} {...props} />
                  )}
               />
            </Tracks>
         </div>
      );
   }
}

export default TracksContainer;
