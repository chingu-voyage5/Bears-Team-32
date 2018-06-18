import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import SearchResult from './SearchResult';
import RecentSearch from './RecentSearch';
const Links = [
  { type: 'recent', name: 'recent searches', to: '/search/recent' },
  { type: 'results', name: 'top results', to: '/search/results' },
  { type: 'artists', name: 'artists', to: '/search/artists' },
  { type: 'tracks', name: 'tracks', to: '/search/tracks' },
  { type: 'albums', name: 'albums', to: '/search/albums' },
  { type: 'playlists', name: 'playlists', to: '/search/playlists' },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`;

const SearchContent = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100%;
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
  cursor: pointer;
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

const Menu = styled.div`
  margin: 2rem 0;
`;

class Search extends Component {
  state = { currentLink: Links[0], searchData: [] };

  componentDidUpdate() {
    if (this.props.location.pathname.includes('/search')) {
      if (this.props.location.pathname !== this.state.currentLink.to) {
        const selectedLink = Links.filter(link => {
          return link.to === this.props.location.pathname;
        })[0];
        if (selectedLink) {
          document.title = selectedLink.name;
          this.setState({ currentLink: selectedLink });
        }
      }
    }
  }

  clickHandler = selectedlinkName => {
    const selectedLink = Links.filter(link => {
      return link.name === selectedlinkName;
    })[0];
    document.title = selectedLink.name;
    this.setState({ currentLink: selectedLink });
  };

  searchHandler = data => {
    const { albums, artists, playlists, tracks } = data;
    data.results = {
      items: {
        track: tracks.items.slice(0, 5),
        artist: artists.items.slice(0, 12),
        album: albums.items.slice(0, 12),
        playlist: playlists.items.slice(0, 12),
      },
    };
    this.setState(
      () => ({ searchData: data }),
      () => {
        this.props.history.push('/search/results');
      },
    );
  };

  hasSearchData = () => {
    return Object.keys(this.state.searchData).length !== 0;
  };

  routeProps = ({ type }) => {
    const { searchData } = this.state;
    return {
      path: `/search/${type}`,
      render: () => {
        return !searchData[type] ? (
          <Redirect to="/search" />
        ) : (
          <SearchResult data={searchData[type]} type={type.slice(0, -1)} />
        );
      },
    };
  };

  linkProps = ({ to, name }) => {
    const { currentLink } = this.state;
    return {
      key: to,
      to,
      onClick: () => this.clickHandler(name),
      selected: currentLink.name === name,
    };
  };

  render() {
    return (
      <Wrapper>
        <SearchBar searchHandler={this.searchHandler} />
        <SearchContent>
          <Menu>
            <StyledLink {...this.linkProps(Links[0])}>{Links[0].name}</StyledLink>

            {this.hasSearchData() &&
              Links.slice(1).map(link => (
                <StyledLink {...this.linkProps(link)}>{link.name}</StyledLink>
              ))}
          </Menu>
          <Switch>
            {Links.slice(1).map(link => <Route {...this.routeProps(link)} key={link.type} />)}
            <Route render={() => <RecentSearch />} />
          </Switch>
        </SearchContent>
      </Wrapper>
    );
  }
}

export default withRouter(Search);
