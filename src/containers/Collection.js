import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import CollectionEmpty from './CollectionEmpty';
import OtherResult from './SearchResult/OtherResult';
import TrackResult from './SearchResult/TrackResult';
import Storage from '../Storage';
import StorageContext from '../components/storageContext';
import { withRouter } from 'react-router';

const Links = [
  { type: 'playlist', name: 'playlists', to: '/collection/playlists' },
  { type: 'track', name: 'songs', to: '/collection/tracks' },
  { type: 'album', name: 'albums', to: '/collection/albums' },
  { type: 'artist', name: 'artists', to: '/collection/artists' },
];

const bgColors = {
  default: '#1E3263',
  playlist: '#545442',
  track: '#1E3263',
  album: '#38332B',
  artist: '#34565A',
};
class Collection extends Component {
  state = { currentLink: Links[0], items: Storage.getItems(Links[0].type) };

  clickHandler = selectedlinkName => {
    const selectedLink = Links.filter(link => link.name === selectedlinkName)[0];
    document.title = selectedLink.name;
    this.setState({ currentLink: selectedLink, items: Storage.getItems(selectedLink.type) });
  };

  static getDerivedStateFromProps(props, state) {
    const { pathname } = props.location;
    if (pathname.includes('/collection')) {
      if (pathname !== state.currentLink.to) {
        const selectedLink = Links.filter(link => link.to === pathname)[0];
        if (selectedLink) {
          document.title = selectedLink.name;
          return { currentLink: selectedLink, items: Storage.getItems(selectedLink.type) };
        }
      }
    }

    // No state update necessary
    return null;
  }

  linkProps = ({ to, name }) => {
    const { currentLink } = this.state;
    return {
      key: to,
      to,
      onClick: () => this.clickHandler(name),
      selected: currentLink.name === name,
    };
  };

  getRoutes = ({ type, to }) => {
    const { items } = this.state;
    const layoutComp =
      items.length > 0 ? (
        type === 'track' ? (
          <TrackResult type={type} results={items} />
        ) : (
          <OtherResult type={type} results={items} bgColor="transparent" />
        )
      ) : (
        <CollectionEmpty />
      );
    return <Route path={to} render={() => layoutComp} key={type} />;
  };

  refreshItems = () => {
    this.setState(({ currentLink }) => ({ items: Storage.getItems(currentLink.type) }));
  };

  render() {
    const { currentLink, items } = this.state;
    return (
      <StorageContext.Provider value={{ handler: this.refreshItems }}>
        <CollectionWrapper>
          <Wrapper bgColor={items.length > 0 ? bgColors[currentLink.type] : bgColors['default']}>
            {Links.map(link => <StyledLink {...this.linkProps(link)}>{link.name}</StyledLink>)}
            <Switch>{Links.map(link => this.getRoutes(link))}</Switch>
          </Wrapper>
        </CollectionWrapper>
      </StorageContext.Provider>
    );
  }
}

export default withRouter(Collection);

const CollectionWrapper = styled.div`
  height: 100%;
  overflow: auto;
  position: relative;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  min-height: 100%;
  padding-top: 2rem;
  transition: background-color 500ms;
  background: ${props => `linear-gradient(to bottom, ${props.bgColor}, rgba(0, 0, 0, 0.8))`};
`;

const StyledLink = styled(Link)`
  position: relative;
  color: ${props => (props.selected ? 'white' : 'gray')};
  text-decoration: none;
  padding: 0 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.125rem;
  font-size: 0.75rem;
  font-weight: 700;
  transition: color 400ms;
  &:hover {
    color: white;
  }

  &:after {
    content: '';
    display: ${props => (props.selected ? 'block' : 'none')};
    width: 30px;
    height: 2px;
    background-color: green;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -6px;
  }
`;
