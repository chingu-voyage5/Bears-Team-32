import React, { Component } from 'react';
import styled from 'styled-components';
import SaveToLibrary from '../SaveToLibrary';
import { Link } from 'react-router-dom';

class ArtistHeader extends Component {
  formatNumber = number => {
    return new Intl.NumberFormat().format(number);
  };

  render() {
    const { artist } = this.props;
    return (
      <Wrapper>
        <ArtistImage bgImg={artist.images[0].url} />
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
            <MenuItem>
              <Link to={`/artist/${artist.id}`}>overview</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/artist/${artist.id}/related`}>related artists</Link>
            </MenuItem>
            <MenuItem>about</MenuItem>
          </ul>
        </StyledNav>
      </Wrapper>
    );
  }
}

export default ArtistHeader;

const Wrapper = styled.div`
  position: relative;
`;

const ArtistImage = styled.div`
  position: absolute;
  background-image: ${props => `url(${props.bgImg})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background: linear-gradient(to bottom, rgba(24, 24, 24, 0), rgba(24, 24, 24, 1));
  }
`;

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
  z-index: 9999;
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
  box-shadow: inset 0 0 0 2px #b3b3b3;
  background: hsla(0, 0%, 9%, 0.7);
  outline: none;
  &:active {
    transform: scale(0.9);
  }
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
