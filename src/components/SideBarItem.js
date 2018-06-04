import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import classNames from 'classnames';

class SideBarItem extends Component {
  render() {
    const { currentLink, clickHandler, link } = this.props;
    const { name, to, icon } = link;
    return (
      <Wrapper selected={currentLink.name === name}>
        <StyledIcon className={classNames('fas', icon)} />
        <StyledLink to={to} onClick={() => clickHandler(name)}>
          {name}
        </StyledLink>
      </Wrapper>
    );
  }
}

export default SideBarItem;

const StyledIcon = styled.i`
  transition: color 400ms;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 900;
  margin-left: 1rem;
  transition: color 400ms;
`;

const Wrapper = styled.div`
  text-align: left;
  padding: 0.75rem 0;

  & > ${StyledIcon} {
    color: ${props => (props.selected ? 'green' : 'gray')};
  }

  & > ${StyledLink} {
    color: ${props => (props.selected ? 'green' : 'gray')};
  }

  &:hover > ${StyledIcon} {
    color: ${props => (props.selected ? 'green' : 'white')};
  }
  &:hover > ${StyledLink} {
    color: ${props => (props.selected ? 'green' : 'white')};
  }
`;
