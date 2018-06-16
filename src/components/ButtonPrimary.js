import React from "react";
import styled from "styled-components";

const Button = styled.button`
   border: none;
   padding: 0.8rem;
   outline: none;
   width: 10rem;
   background: var(--color-primary);
   color: var(--color-white);
   border-radius: 2rem;
   margin: 1rem 0;
   cursor: pointer;
   transition: all 0.2s;

   &:hover {
      color: rgba(255, 255, 255, 0.8);
      transform: scale(1.05);
      background: var(--color-primary-bright);
   }
`;

const ButtonPrimary = () => {
   return <Button>Play</Button>;
};

export default ButtonPrimary;
