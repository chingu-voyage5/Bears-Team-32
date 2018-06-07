import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import Layout from '../components/Layout';

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

const SearchResult = styled.div`
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
  state = { currentLink: Links[0], searchData: {} };

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
    console.log(data);
    this.setState({ searchData: data });
  };

  render() {
    const { currentLink } = this.state;

    return (
      <Wrapper>
        <SearchBar searchHandler={this.searchHandler} />
        <SearchResult>
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
          <div>
            <Switch>
              <Route path="/search/results" render={() => <h1>results</h1>} />
              <Route path="/search/artists" render={() => <h1>artists</h1>} />
              <Route path="/search/tracks" render={() => <h1>tracks</h1>} />
              <Route path="/search/albums" render={() => <h1>albums</h1>} />
              <Route path="/search/playlists" render={() => <h1>playlists</h1>} />
              <Route render={() => <h1>recent</h1>} />
            </Switch>
          </div>
        </SearchResult>
      </Wrapper>
    );
  }
}

export default withRouter(Search);
