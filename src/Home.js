import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Layout from './Layout';
import styled from 'styled-components';
import { withRouter } from 'react-router';

const Links = [
  { name: 'featured', to: '/browse/featured' },
  { name: 'podcasts', to: '/browse/podcasts' },
  { name: 'genres & moods', to: '/browse/genres' },
  { name: 'new releases', to: '/browse/newreleases' },
  { name: 'discover', to: '/browse/discover' },
];

const bgColors = {
  featured: '#5D3F3A',
  podcasts: '#7A211E',
  'genres & moods': '#262426',
  'new releases': '#2e426b',
  discover: '#3A495E',
};

class Home extends Component {
  state = { currentLink: Links[0] };

  componentDidUpdate() {
    if (this.props.location.pathname.includes('/browse')) {
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

  render() {
    const { currentLink } = this.state;
    return (
      <Wrapper bgColor={bgColors[currentLink.name]}>
        <div>
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
        </div>

        <div>
          <Switch>
            <Route path="/browse/podcasts" render={() => <Layout name={'podcasts'} />} />
            <Route path="/browse/genres" render={() => <Layout name={'genres'} />} />
            <Route path="/browse/newreleases" render={() => <Layout name={'newreleases'} />} />
            <Route path="/browse/discover" render={() => <Layout name={'discover'} />} />
            <Route render={() => <Layout name={'Featured'} />} />
          </Switch>
        </div>
      </Wrapper>
    );
  }
}

export default withRouter(Home);

const Wrapper = styled.div`
  box-sizing: border-box;
  background-color: ${props => props.bgColor};
  position: relative;
  height: 100%;
  padding-top: 2rem;
  transition: background-color 500ms;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }
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
