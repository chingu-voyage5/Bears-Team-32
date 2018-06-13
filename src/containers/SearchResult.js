import React, { Component } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import moment from "moment";
import styled from "styled-components";
import { HeadingPrimary } from "../components/style-utils";
import Track from "../components/Track";

const TracksWrapper = styled.div`
   width: 100%;
   padding: 0 6rem;
   box-sizing: border-box;
`;

const TrackHeader = styled.div`
   display: flex;
   width: 100%;
   justify-content: space-between;
   & > div:last-of-type {
      color: gray;
   }
`;
const TrackDesc = styled.div`
   text-align: left;
   color: gray;
   padding-top: 0.5rem;
   padding-bottom: 2rem;
`;

// const Track = ({ item }) => {
//    return (
//       <React.Fragment>
//          <TrackHeader>
//             <div>{item.name}</div>
//             <div>{moment(item.duration_ms).format("m:ss")}</div>
//          </TrackHeader>
//          <TrackDesc>{`${item.artists[0].name}.${item.album.name}`}</TrackDesc>
//       </React.Fragment>
//    );
// };

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
         //  return (
         //     <TracksWrapper>
         //        <HeadingPrimary>{type}</HeadingPrimary>
         //        {items.map(item => <Track item={item} key={item.id} />)}
         //     </TracksWrapper>
         //  );
      } else {
         //  console.log("Not a track: ", type);

         return (
            <Layout header={type}>
               {items.map(item => (
                  <Link to={`/${type}/${item.id}`} key={item.id}>
                     {item.images.length > 0 ? (
                        <Card circle image={item.images[0].url} />
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
      const { items, type } = this.props;
      return this.getItems();
   }
}

export default SearchResult;
