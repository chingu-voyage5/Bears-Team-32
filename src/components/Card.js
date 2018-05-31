import React from "react";
import styled from "styled-components";
import faker from "faker";

const Figure = styled.figure`
   display: inline-block;
   /* border-radius: props => props.radius || "0"" : "0")}; */

   width: 20rem;
   height: 20rem;
   box-shadow: var(--shadow-section);
   margin-bottom: 2rem;
`;

const Figcaption = styled.figcaption`
   color: var(--color-white);
   /* color: ${props => (props.circle === "yes" ? "blue" : "yellow")}; */
   text-align: center;
`;

const Img = styled.img`
   width: 100%;
   height: 100%;
   /* width: 19rem;
   height: 19rem; */
   /* src: url(${props => props.src}); */
`;

const abstractImage = faker.image.abstract(300, 300);

const Card = () => {
   return (
      <Figure>
         <Img src={abstractImage} alt="Random Image" />
         <Figcaption>Random Image</Figcaption>
      </Figure>
   );
};

export default Card;
