import styled, { css } from "styled-components";

export const respond = {
   handheld: (...args) => css`
      @media (max-width: 420px) {
         ${css(...args)};
      }
   `
};

export const SideBarWrapper = styled.div`
   display: flex;
   background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
`;

export const AppWrapper = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   background-color: rgba(122, 11, 255, 0.1);
   width: 70%;
   margin: 0 auto;
`;
