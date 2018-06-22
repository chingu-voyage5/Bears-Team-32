import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import CollectionEmpty from './CollectionEmpty';
const Links = [
  { name: 'playlists', to: '/collection/playlists' },
  { name: 'songs', to: '/collection/tracks' },
  { name: 'albums', to: '/collection/albums' },
  { name: 'artists', to: '/collection/artists' },
];
class Collection extends Component {
  state = { currentLink: Links[0] };
  clickHandler = selectedlinkName => {
    const selectedLink = Links.filter(link => {
      return link.name === selectedlinkName;
    })[0];
    document.title = selectedLink.name;
    this.setState({ currentLink: selectedLink });
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

  // getRoutes = ({ name, to, api }) => {
  //   const layoutComp = <HomeResult name={name} api={api} />;
  //   return name !== 'featured' ? <Route path={to} render={() => layoutComp} key={name} /> : null;
  // };

  render() {
    return (
      <CollectionWrapper>
        <Wrapper bgColor="#1E3263">
          {Links.map(link => <StyledLink {...this.linkProps(link)}>{link.name}</StyledLink>)}
          <CollectionEmpty />
          {/* <Switch>
            {Links.map(link => this.getRoutes(link))}
            <Route render={() => <HomeResult name={Links[0].name} api={Links[0].api} />} />
          </Switch> */}
        </Wrapper>
      </CollectionWrapper>
    );
  }
}

export default Collection;

const CollectionWrapper = styled.div`
  height: 100%;
  overflow: auto;
  position: relative;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  background-color: ${props => props.bgColor};
  position: relative;
  min-height: 100%;
  padding-top: 2rem;
  transition: background-color 500ms;
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
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
