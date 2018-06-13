import React from "react";
import styled from "styled-components";

const PlaylistWrapper = styled.section`
position:relative;
   display: grid;
   width: 90%;
   font-size: 0.8rem;
   /* grid-template-columns: ${props =>
      props.type === "track" ? "1% 1fr" : "30% 1fr"}; */
   grid-template-columns: 1% 1fr;
   grid-gap: 2rem;
   transition: all .3s;

   &:hover{
         background: rgba(0,0,0, .1);
   }
   span:first-child::before{
         position: absolute;
         left: -2rem;
         top: 1rem;
         font-family: FontAwesome;
         content: "\f001";
         color: rgba(255, 255, 255, 0.6);
         transform: scale(1.1);
   }
   &:hover span:first-child::before{
         position: absolute;
         left: -2rem;
         top: 1rem;
         font-family: FontAwesome;
         content: "\f04b";
         color: var(--color-white);
         transform: scale(1.1);
   }
      &:hover a{
            display: grid;
      }
`;

const TrackWraper = styled.section`
   position: relative;

   display: grid;
   grid-column: 2/3;
   justify-content: start;
   grid-template-columns: repeat(autofill, minmax(min-content, 1fr));
   grid-template-rows: 100% 1fr;
   /* background: rgba(0, 255, 255, 0.1); */
   padding: 1rem 0;
   grid-gap: 0.5rem;
`;

const TrackName = styled.span`
   grid-row: 1/2;
   justify-self: start;
   font-size: 1.1rem;
`;

const RowContainer = styled.span`
   display: grid;
   color: rgba(255, 255, 255, 0.6);
   grid-row: 2/3;
   grid-gap: 0.5rem;
`;

const Explicit = styled.span`
   display: ${props => (props.explicit ? "inline-grid" : "none")};
   grid-row: 1/2;
   font-weight: 300;
   padding: 2px 5px;
   background-color: rgba(255, 255, 255, 0.6);
   color: black;
   border-radius: 2px;
`;

const Name = styled.a`
   grid-row: 1/2;
   color: inherit;
   border-bottom: 1px solid transparent;
   padding-bottom: 3px;

   &:hover {
      color: var(--color-white);
      border-bottom: 1px solid currentColor;
   }
`;

const Dot = styled.span`
   grid-row: 1/2;
`;

const MenuEllipsis = styled.a`
   grid-row: 1/2;
   color: white;
   position: absolute;
   right: 7rem;
   top: -1rem;
   font-size: 2.5rem;
   display: none;
`;

const TrackDuration = styled.span`
   position: absolute;
   right: 1rem;
   grid-row: 1/2;
   letter-spacing: 1px;
   font-size: 1rem;
`;

const Track = ({ artists, trackName, albumName, trackDuration, explicit }) => {
   function millisToMinutesAndSeconds(millis) {
      const minutes = Math.floor(millis / 60000);
      const seconds = ((millis % 60000) / 1000).toFixed(0);
      return seconds === 60
         ? minutes + 1 + ":00"
         : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
   }
   return (
      <PlaylistWrapper>
         <TrackWraper>
            <TrackName>{trackName}</TrackName>
            <RowContainer>
               <Explicit explicit={explicit}>
                  {explicit ? "EXPLICIT" : null}
               </Explicit>
               <Name href="#">
                  {artists.length > 1
                     ? artists.map(
                          artist =>
                             artist === artists[artists.length - 1]
                                ? artist
                                : `${artist}, `
                       )
                     : artists[0]}
               </Name>
               <Dot>&sdot;</Dot>
               <Name href="#">{albumName}</Name>
               <MenuEllipsis href="#">&hellip;</MenuEllipsis>
               <TrackDuration>
                  {millisToMinutesAndSeconds(trackDuration)}
               </TrackDuration>
            </RowContainer>
         </TrackWraper>
      </PlaylistWrapper>
   );
};

export default Track;
