import React, { Component } from 'react';
import styled from 'styled-components';
import SideBarItem from '../components/SideBarItem';
import { withRouter } from 'react-router';

const Links = [
  { name: 'Search', to: '/search/recent', icon: 'fa-search' },
  { name: 'Home', to: '/browse/featured', icon: 'fa-home' },
  { name: 'Your Library', to: '/collection/playlist', icon: 'fa-book-open' },
];

class SideBar extends Component {
  state = { currentLink: Links[1] };

  componentDidUpdate() {
    /* Update selection on route change */
    if (
      !(
        this.props.location.pathname.includes('/browse') &&
        this.state.currentLink.to.includes('/browse')
      )
    ) {
      if (this.props.location.pathname !== this.state.currentLink.to) {
        const selectedLink = Links.filter(link => {
          if (this.props.location.pathname.includes('/browse')) {
            return link.to.includes('/browse');
          }
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
    const selectedLink = Links.filter(link => link.name === selectedlinkName)[0];
    document.title = selectedLink.name;

    this.setState({ currentLink: selectedLink });
  };

  render() {
    return (
      <Wrapper>
        {Links.map(link => (
          <SideBarItem
            key={link.name}
            clickHandler={this.clickHandler}
            link={link}
            currentLink={this.state.currentLink}
          />
        ))}
      </Wrapper>
    );
  }
}

export default withRouter(SideBar);

const Wrapper = styled.div`
  background-color: black;
  padding: 0 2rem;
  height: 100%;
`;
