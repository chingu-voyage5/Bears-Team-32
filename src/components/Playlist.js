import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Track from "../components/Track";
import ButtonPrimary from "../components/ButtonPrimary";

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

const Playlist = ({
   tracksTotal,
   playlistImageURL,
   playlistDescription,
   playlistName,
   dataType,
   playlistOwner,
   tracks
}) => {
   const tracksPlaylist = tracks.map(track => {
      let artists = [];
      if (track.track.artists.length > 1) {
         track.track.artists.map(artist => {
            artists.push(artist.name);
         });
      } else {
         artists = [track.track.artists[0].name];
      }

      return (
         <Track
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
               image={playlistImageURL}
               name={playlistName}
            />
            <Paragraph>{playlistOwner}</Paragraph>
            <Paragraph>{playlistDescription}</Paragraph>
            <Paragraph>{tracksTotal} Songs</Paragraph>
            <ButtonPrimary>Play</ButtonPrimary>
         </CardWrapper>
         <TracksWrapper>{tracksPlaylist}</TracksWrapper>
      </PlaylistContainer>
   );
};

export default Playlist;
