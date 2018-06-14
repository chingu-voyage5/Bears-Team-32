import styled, { css } from "styled-components";

export const respond = {
   handheld: (...args) => css`
      @media (max-width: 420px) {
         ${css(...args)};
      }
   `
};

// export const makeArtistArray = artists => {
//    let artistArray = [];
//    console.log("makeArtistArray", artists);
//    if (artists && artists.length > 0) {
//       if (artists.length > 1) {
//          artists.map(artist => {
//             console.log("artist", artist.name);

//             return artistArray.push(artist.name);
//          });
//       } else {
//          return (artistArray = [artists[0].name]);
//       }
//    }
// };

export const displayArtistName = artists => {
   console.log("displayartist:", artists, typeof artists);

   return artists && artists.length > 1
      ? artists.map(
           artist =>
              artist === artists[artists.length - 1] ? artist : `${artist}, `
        )
      : artists[0];
};

export const WrapperMenu = styled.header`
   display: grid;
   grid-column: 2/3;
   height: 5rem;
   width: 80%;
   margin: 0 auto;
`;

export const WrapperSideBar = styled.aside`
   display: grid;
   grid-column: 1/2;
   grid-row: 1/3;
`;

export const WrapperFooter = styled.footer`
   display: grid;
   grid-column: 1/3;
   grid-row: 3/4;
   height: 9rem;
`;

export const WrapperSection = styled.section`
   display: grid;
   grid-gap: 2rem 2rem;
   justify-items: center;
   width: 90%;
   margin: 4rem auto;
   padding: 3rem;
   grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
`;

export const WrapperMain = styled.main`
   display: grid;
   grid-column: 2/3;
   width: 100%;
`;

export const WrapperApp = styled.div`
   display: grid;
   grid-template-columns: 17rem 1fr;
   grid-template-rows: 20rem 1fr;
   justify-content: center;
`;

export const HeadingPrimary = styled.h1`
   grid-column: 1/-1;
   color: var(--color-white);
   font-size: 3rem;
   font-weight: 600;
   justify-self: center;
   text-align: center;
   line-height: 1.4;
`;
