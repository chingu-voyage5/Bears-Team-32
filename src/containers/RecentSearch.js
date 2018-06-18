import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
class RecentSearch extends Component {
  state = {
    results: JSON.parse(localStorage.getItem('bears-team-32')) || [],
  };

  render() {
    return (
      <div>
        {this.state.results.map(result => (
          <Wrapper key={result.id}>
            <StyledLink to={`/${result.type}/${result.id}`}>{result.name}</StyledLink>
            <StyledSpan>{result.type}</StyledSpan>
          </Wrapper>
        ))}
      </div>
    );
  }
}

export default RecentSearch;

const Wrapper = styled.div`
  text-align: left;
  margin-bottom: 1.5rem;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  font-size: 28px;
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
