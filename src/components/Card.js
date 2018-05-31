import React from "react";
import styled from "styled-components";
import faker from "faker";

const Figure = styled.figure`
   display: inline-block;
   border-radius: ${props => (props.circle ? "50%" : "none")};
   width: 20rem;
   height: 20rem;
   box-shadow: var(--shadow-section);
   margin-bottom: 2rem;
`;

const Figcaption = styled.figcaption`
   color: var(--color-white);
   color: ${props => (props.circle ? "blue" : "yellow")};
   text-align: center;
`;

const Img = styled.img`
   width: 100%;
   height: 100%;
`;

const abstractImage = faker.image.abstract(300, 300);

const Card = props => {
   console.log(props);

   return (
      <Figure circle={props.circle}>
         <Img src={abstractImage} alt="Random Image" />
         <Figcaption circle={props.circle}>Random Image</Figcaption>
      </Figure>
   );
};

export default Card;
