import React from "react";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";
import "font-awesome/css/font-awesome.css";

const Figure = styled.figure`
   display: inline-block;
   border-radius: ${props => (props.circle ? "50%" : "none")};
   width: ${props => (props.big ? "19rem" : "13rem")};
   height: ${props => (props.big ? "19rem" : "13rem")};
   box-shadow: ${props => (props.noshadow ? "none" : "var(--shadow-section)")};
   margin-bottom: 2.5rem;
   margin-bottom: ${props => (props.big ? "4rem" : "2.5")};
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

   figcaption {
      color: var(--color-white);
      text-align: center;
      font-size: ${props => (props.big ? "1.4rem" : "0.9rem")};
      font-weight: ${props => (props.big ? "700" : "400")};
      padding: ${props => (props.big ? "1.2rem" : "0.4rem")};
   }

   img {
      width: 100%;
      height: 100%;
   }
`;

const Card = props => {
   return (
      <Figure noshadow={props.noshadow} circle={props.circle} big={props.big}>
         <img src={props.image} alt="Random " />
         <figcaption big={props.big}>{props.name}</figcaption>
         <button>
            <FontAwesome name="play-circle" />
         </button>
      </Figure>
   );
};

export default Card;
