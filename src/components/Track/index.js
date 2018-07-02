import React, { Component } from "react";
import styled from "styled-components";
import { displayArtistName } from "../style-utils";
import moment from "moment";
import ContextMenu from "./ContextMenu";
import Storage from "../../Storage";
const PlaylistWrapper = styled.section`
   position: relative;
   display: grid;
   width: ${props => (props.type === "artist" ? "70%" : "90%")};
   grid-template-columns: ${props =>
      props.type === "artist" ? "100px 1fr" : "1% 1fr"};
   margin: 0 auto;
   font-size: 0.8rem;
   grid-template-columns: 1% 1fr;
   grid-gap: 1rem;
   transition: all 0.3s;

   &:hover {
      background: rgba(0, 0, 0, 0.1);
   }

   span:first-child::before {
      position: absolute;
      left: ${props => (props.type === "artist" ? "-6rem" : "-2rem")};
      top: ${props => (props.type === "artist" ? "1.6rem" : "1 rem")};
      font-family: FontAwesome;
      content: "\f001";
      color: rgba(255, 255, 255, 0.6);
      /* transform: scale(1.2); */
   }

   &:hover span:first-child::before {
      position: absolute;
      left: ${props => (props.type === "artist" ? "-6rem" : "-2rem")};
      top: ${props => (props.type === "artist" ? "1.6rem" : "1 rem")};
      font-family: FontAwesome;
      content: "\f04b";
      color: var(--color-white);
      /* transform: scale(1.2); */
   }
   &:hover a {
      display: grid;
   }
`;

const AlbumImage = styled.img`
   align-self: center;
   justify-self: right;
   grid-column: 1/2;
   width: 50px;
   height: 50px;
   background-color: rgba(111, 111, 255, 0.1);
`;

const TrackWraper = styled.section`
   position: relative;
   display: inline-grid;
   grid-column: 2/3;
   justify-content: start;
   grid-template-columns: repeat(auto-fill, minmax(min-content, max-content));
   /* grid-template-rows: 100% 1fr; */
   padding: 1rem 0;
   grid-gap: 0.5rem;
`;

const TrackName = styled.span`
   grid-row: 1/2;
   justify-self: start;
   font-size: 1rem;
   width: max-content;
`;

const Explicit = styled.span`
   display: ${props => (props.explicit ? "grid" : "none")};
   grid-row: ${props => (props.type === "artist" ? "2/3" : "1/2")};
   /* grid-column: 1/2; */
   font-weight: 300;
   padding: 2px 5px;
   background-color: rgba(255, 255, 255, 0.6);
   color: black;
   border-radius: 2px;
   /* width: 11rem; */
   /* width: min-content; */
`;

const RowContainer = styled.span`
   display: grid;
   color: rgba(255, 255, 255, 0.6);
   /* grid-column: ${props => (props.type === "artist" ? "2/-1" : "")}; */
   grid-row: 2/3;
   grid-gap: 0.5rem;
   justify-content: start;
   justify-items: start;
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
   margin-top: -5px;
   grid-row: 1/2;
   font-weight: 900;
   font-size: 1.3rem;
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

class Track extends Component {
   state = { toggleMenu: false, menuPos: {} };
   trackRef = React.createRef();
   componentDidMount() {
      window.addEventListener("click", this.closeMenu);
      window.addEventListener("contextmenu", this.closeMenu);
   }

   closeMenu = e => {
      if (e.type === "contextmenu") {
         e.target.id !== this.trackRef.current.id &&
            this.setState({ toggleMenu: false });
      } else {
         this.setState({ toggleMenu: false });
      }
   };
   openMenu = e => {
      const { clientX, clientY, target } = e;
      const rect = target.getBoundingClientRect();
      const menuPos = {
         left: clientX - rect.left,
         top: clientY - rect.top
      };
      this.setState(({ toggleMenu }) => ({ toggleMenu: !toggleMenu, menuPos }));
      e.preventDefault();
   };

   addToLibrary = () => {
      //TODO
      let items = Storage.getItems("track");
      items.push(this.props.data);
      Storage.setItems("track", items);
   };

   render() {
      const {
         type,
         albumImage,
         artists,
         trackName,
         albumName,
         trackDuration,
         explicit,
         id
      } = this.props;
      const { toggleMenu, menuPos } = this.state;
      return (
         <PlaylistWrapper type="artist">
            {type === "artist" && albumImage ? (
               <AlbumImage type="artist" src={albumImage} alt="Album Image" />
            ) : null}
            <TrackWraper
               onContextMenu={this.openMenu}
               id={id}
               innerRef={this.trackRef}
            >
               <TrackName>{trackName}</TrackName>

               <RowContainer>
                  <Explicit explicit={explicit}>
                     {explicit ? "EXPLICIT" : null}
                  </Explicit>
                  {type !== "artist" && type !== "album" ? (
                     <React.Fragment>
                        <Name href="#">{displayArtistName(artists)}</Name>
                        <Dot>&sdot;</Dot>
                        <Name href="#">{albumName}</Name>
                     </React.Fragment>
                  ) : null}

                  <MenuEllipsis href="#">&hellip;</MenuEllipsis>

                  <TrackDuration>
                     {moment(trackDuration).format("m:ss")}
                  </TrackDuration>
               </RowContainer>
               {toggleMenu && (
                  <ContextMenu pos={menuPos} addToLibrary={this.addToLibrary} />
               )}
            </TrackWraper>
         </PlaylistWrapper>
      );
   }
}

export default Track;
