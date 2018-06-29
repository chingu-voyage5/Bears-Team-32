import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Storage from '../Storage';
class RecentSearch extends Component {
  state = {
    results: Storage.getItems('recent'),
  };

  render() {
    return (
      <Wrapper>
        {this.state.results.map(result => (
          <SearchItem key={result.id}>
            <StyledLink to={`/${result.type}/${result.id}`}>{result.name}</StyledLink>
            <StyledSpan>{result.type}</StyledSpan>
          </SearchItem>
        ))}
      </Wrapper>
    );
  }
}

export default RecentSearch;

const Wrapper = styled.div`
  padding: 0 8rem;
  margin-top: 2rem;
`;

const SearchItem = styled.div`
  text-align: left;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  font-size: 2.5rem;
  text-decoration: none;
  color: hsla(0, 0%, 100%, 0.6);
  display: block;
  margin-bottom: 0.2rem;
  transition: color 400ms;
  &:hover {
    color: white;
  }
`;

const StyledSpan = styled.span`
  font-size: 11px;
  font-weight: 200;
  color: hsla(0, 0%, 100%, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.16em;
`;
