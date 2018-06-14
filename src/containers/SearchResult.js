import React, { Component } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import moment from "moment";
import styled from "styled-components";
import { HeadingPrimary } from "../components/style-utils";
import Track from "../components/Track";

class SearchResult extends Component {
   getItems = () => {
      const { items, type } = this.props;

      if (type === "track") {
         const tracksPlaylist = items.map(track => {
            let artists = [];
            if (track.artists.length > 1) {
               track.artists.map(artist => {
                  artists.push(artist.name);
               });
            } else {
               artists = [track.artists[0].name];
            }
            return (
               <Track
                  type={type}
                  key={track.id}
                  artists={artists}
                  trackName={track.name}
                  albumName={track.album.name}
                  trackDuration={track.duration_ms}
                  explicit={track.explicit}
               />
            );
         });
         return tracksPlaylist;
      } else if (type === "album") {
         console.log("items", this.props);

         return (
            <Layout header={type}>
               {items.map(item => (
                  <Link to={`/${type}/${item.id}`} key={item.id}>
                     {item.images.length > 0 ? (
                        <Card
                           type={type}
                           image={item.images[0].url}
                           name={item.name}
                           artists={item.artists}
                        />
                     ) : (
                        item.name
                     )}
                  </Link>
               ))}
            </Layout>
         );
      } else if (type === "artist") {
         return (
            <Layout header={type}>
               {items.map(item => (
                  <Link to={`/${type}/${item.id}`} key={item.id}>
                     {item.images.length > 0 ? (
                        <Card
                           circle="yes, please"
                           name={item.name}
                           image={item.images[0].url}
                        />
                     ) : (
                        item.name
                     )}
                  </Link>
               ))}
            </Layout>
         );
      } else {
         return (
            <Layout header={type}>
               {items.map(item => (
                  <Link to={`/${type}/${item.id}`} key={item.id}>
                     {item.images.length > 0 ? (
                        <Card image={item.images[0].url} />
                     ) : (
                        item.name
                     )}
                  </Link>
               ))}
            </Layout>
         );
      }
   };

   render() {
      return this.getItems();
   }
}

export default SearchResult;
