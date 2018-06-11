import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import SearchResult from './SearchResult';

const Links = [
  { name: 'recent searches', to: '/search/recent' },
  { name: 'top results', to: '/search/results' },
  { name: 'artists', to: '/search/artists' },
  { name: 'tracks', to: '/search/tracks' },
  { name: 'albums', to: '/search/albums' },
  { name: 'playlists', to: '/search/playlists' },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SearchContent = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
    this.setState({ searchData: data });
  };

  hasSearchData = () => {
    return Object.keys(this.state.searchData).length !== 0;
  };

  render() {
    const { currentLink } = this.state;

    return (
      <Wrapper>
        <SearchBar searchHandler={this.searchHandler} />
        <SearchContent>
          {this.hasSearchData() && (
            <Menu>
              {Links.map(link => (
                <StyledLink
                  key={link.to}
                  to={link.to}
                  onClick={() => this.clickHandler(link.name)}
                  selected={currentLink.name === link.name}
                >
                  {link.name}
                </StyledLink>
              ))}
            </Menu>
          )}
          <div>
            <Switch>
              <Route path="/search/results" render={() => <h1>results</h1>} />
              <Route
                path="/search/artists"
                render={() => (
                  <SearchResult items={this.state.searchData['artists'].items} type="artist" />
                )}
              />
              <Route
                path="/search/tracks"
                render={() => <SearchResult items={this.state.searchData['tracks'].items} />}
              />

              <Route
                path="/search/albums"
                render={() => (
                  <SearchResult items={this.state.searchData['albums'].items} type="album" />
                )}
              />
              <Route
                path="/search/playlists"
                render={() => (
                  <SearchResult items={this.state.searchData['playlists'].items} type="playlist" />
                )}
              />
              <Route render={() => <h1>Recent</h1>} />
            </Switch>
          </div>
        </SearchContent>
      </Wrapper>
    );
  }
}

export default withRouter(Search);
