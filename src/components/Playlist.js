import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Track from "../components/Track";
import ButtonPrimary from "../components/ButtonPrimary";
import moment from "moment";
import { makeArtistArray } from "./style-utils";

const PlaylistContainer = styled.section`
   display: grid;
   grid-template-columns: 30% 1fr;
`;

const CardWrapper = styled.div`
   grid-column: 1/2;
   margin-top: 4rem;
   margin-left: 5rem;
   /* justify-self: end; */
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

const Playlist = ({
   tracksTotal,
   playlistImageURL,
   playlistDescription,
   playlistName,
   playlistOwner,
   tracks,
   type,
   albumInfo
}) => {
   console.log(type, "albumInfo: ", albumInfo);

   const tracksPlaylist = tracks.map(track => {
      let artistsArray = [];
      if (!type && type !== "album") {
         if (track.track.artists.length > 1) {
            track.track.artists.map(artist => {
               artistsArray.push(artist.name);
            });
         } else {
            artistsArray = [track.track.artists[0].name];
         }
      }
      console.log(type, "track naem: ", track.name);

      return (
         <Track
            type={type}
            key={type && type === "album" ? track.id : track.track.id}
            artists={type && type === "album" ? null : artistsArray}
            trackName={type && type === "album" ? track.name : track.track.name}
            albumName={type && type === "album" ? null : track.track.album.name}
            trackDuration={
               type && type === "album"
                  ? track.duration_ms
                  : track.track.duration_ms
            }
            explicit={
               type && type === "album" ? track.explicit : track.track.explicit
            }
         />
      );
   });

   const albumReleaseDate = moment(albumInfo.release_date, "YYYY/MM/DD").year();

   return (
      <PlaylistContainer>
         <CardWrapper>
            <Card
               noshadow="true"
               big="true"
               image={playlistImageURL}
               name={playlistName}
            />
            <Paragraph>
               {type === "album" ? albumInfo.artists[0].name : playlistOwner}
            </Paragraph>
            <Paragraph>
               {type === "album" ? null : playlistDescription}
            </Paragraph>
            <Paragraph>
               {type === "album" ? `${albumReleaseDate} · ` : null}{" "}
               {tracksTotal > 1 ? `${tracksTotal} SONGS` : `1 SONG`}
            </Paragraph>
            <ButtonPrimary>Play</ButtonPrimary>
         </CardWrapper>
         <TracksWrapper>{tracksPlaylist}</TracksWrapper>
      </PlaylistContainer>
   );
};

export default Playlist;
