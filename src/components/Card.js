import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';
import { displayArtistName } from './style-utils';

const Figure = styled.figure`
   display: inline-block;
   width: ${props => (props.big ? '19rem' : '13rem')};
   height: ${props => (props.big ? '19rem' : '13rem')};
   margin-bottom: 2.5rem;
   margin-bottom: ${props => (props.big ? '4rem' : '2.5')};
   position: relative;
   transition: all 0.5;
   cursor: pointer;

   button {
      font-family: FontAwesome;
      color: var(--color-grey-light-1);
      font-size: 4rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: all 0.3s;
      background: transparent;
      border: transparent;
      outline: 0;

      &:hover {
         transform: translate(-50%, -50%) scale(1.1);
         color: var(--color-white);
         opacity: 1;
      }
   }
   &:hover button {
      opacity: 1;
   }

   &:hover img {
      filter: brightness(50%);
   }

   img {
      box-shadow: ${props => (props.noshadow ? 'none' : 'var(--shadow-section)')};
      border-radius: ${props => (props.circle ? '50%' : 'none')};
      width: 100%;
      height: 100%;
   }

   figcaption {
      color: var(--color-white);
      text-align: center;
      font-size: ${props => (props.big ? '1.4rem' : '0.9rem')};
      font-weight: ${props => (props.big ? '700' : '400')};
      padding: ${props => (props.big ? '1.2rem' : '0.4rem')};
   }

   p{
      /* display: ${props => (props.type ? 'grid' : 'none')}; */
      /* color: var(--color-white-alpha); */
      color: rgba(255, 255, 255, 0.6);
      font-weight: 300;
      font-size: .8rem;
      text-align: center;
   }

`;

const Card = props => {
  let artistsArray = [];

  if (props.artists) {
    const { artists } = props;
    if (props.artists.length > 1) {
      props.artists.map(artist => {
        artistsArray.push(artist.name);
      });
    } else {
      artistsArray = [props.artists[0].name];
    }
  }

  return (
    <Figure noshadow={props.noshadow} circle={props.circle} big={props.big}>
      <img src={props.image} circle={props.circle} alt="Random " />
      <figcaption big={props.big}>{props.name}</figcaption>
      {props.type === 'album' && props.artists ? (
        <p type={props.type}>{displayArtistName(artistsArray)}</p>
      ) : null}
      <button>
        <FontAwesome name="play-circle" />
      </button>
    </Figure>
  );
};

export default Card;
