import React, { Component } from 'react';
import styled from 'styled-components';
import SaveToLibrary from '../SaveToLibrary';
class ArtistHeader extends Component {
  formatNumber = number => {
    return new Intl.NumberFormat().format(number);
  };

  render() {
    const { artist } = this.props;
    return (
      <div>
        <ArtistFollower>{this.formatNumber(artist.followers.total)} followers</ArtistFollower>
        <ArtistTitle>{artist.name}</ArtistTitle>
        <ButtonGroup>
          <PlayButton>Play</PlayButton>
          <SaveToLibrary type="artist" item={artist}>
            {status => (
              <SaveButton onClick={status.clickHandler}>
                {status.saved ? 'Remove from your library' : 'Save to your library'}
              </SaveButton>
            )}
          </SaveToLibrary>
          <MoreButton>...</MoreButton>
        </ButtonGroup>
        <StyledNav>
          <ul>
            <MenuItem>overview</MenuItem>
            <MenuItem>related artists</MenuItem>
            <MenuItem>about</MenuItem>
          </ul>
        </StyledNav>
      </div>
    );
  }
}

export default ArtistHeader;

const ArtistFollower = styled.span`
  color: gray;
  padding-top: 100px;
  display: block;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.2rem;
  margin-bottom: 0.8rem;
`;

const ArtistTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  margin: 1rem auto;
`;

const MenuItem = styled.li`
  display: inline-block;
  padding: 0.6rem;
  margin: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  font-size: 12px;
`;

const StyledButton = styled.button`
  font-size: 11px;
  font-weight: 200;
  letter-spacing: 0.15rem;
  color: white;
  display: inline-block;
  border-radius: 500px;
  min-width: 130px;
  padding: 0.8rem 3rem;
  text-transform: uppercase;
  cursor: pointer;
`;

const PlayButton = StyledButton.extend`
  background-color: #1ed760;
  border: none;
  margin-right: 1rem;
`;

const SaveButton = StyledButton.extend`
  /* border: */
  box-shadow: inset 0 0 0 2px #b3b3b3;
  background: hsla(0, 0%, 9%, 0.7);
`;

const MoreButton = StyledButton.extend`
  background-color: transparent;
  border: none;
  font-size: 1.1rem;
  font-weight: 900;
  padding: 0.8rem 1rem;
  letter-spacing: 0.2rem;
`;

const StyledNav = styled.nav`
  padding: 1.5rem 0;
`;

const ButtonGroup = styled.nav`
  margin-bottom: 2rem;
`;
