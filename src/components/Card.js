import React from "react";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";
import "font-awesome/css/font-awesome.css";

const Figure = styled.figure`
   display: inline-block;
   border-radius: ${props => (props.circle ? "50%" : "none")};
   width: 13rem;
   height: 13rem;
   box-shadow: var(--shadow-section);
   margin-bottom: 2.5rem;
   position: relative;
   transition: all 0.5;

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
         cursor: pointer;
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
      font-size: 0.9rem;
      padding: 0.4rem;
   }

   img {
      width: 100%;
      height: 100%;
   }
`;

const Card = props => {
   return (
      <Figure circle={props.circle}>
         <img src={props.image} alt="Random " />
         <figcaption>{props.name}</figcaption>
         <button>
            <FontAwesome name="play-circle" />
         </button>
      </Figure>
   );
};

export default Card;
