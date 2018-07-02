import React, { Component } from "react";
import TrackResult from "./TrackResult";
import OtherResult from "./OtherResult";
import Card from "../../components/Card";
import styled from "styled-components";
class TopResult extends Component {
   render() {
      const { results } = this.props;
      const artist = results.artist[0];
      return (
         <div>
            <Wrapper>
               <CardWrapper>
                  <Card
                     image={artist.images[0].url}
                     name={artist.name}
                     circle="circle"
                  />
               </CardWrapper>
               <TrackResult type="track" results={results.track} />
            </Wrapper>
            <OtherResult type="artist" results={results.artist} />
            <OtherResult type="album" results={results.album} />
            <OtherResult type="playlist" results={results.playlist} />
         </div>
      );
   }
}

export default TopResult;

const Wrapper = styled.div`
   display: flex;
   width: 100%;
   padding: 0 6rem;
`;

const CardWrapper = styled.div`
   flex-shrink: 0;
`;
