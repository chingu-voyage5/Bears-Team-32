import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
class CollecitonEmpty extends Component {
  clickHandler = () => {
    this.props.history.push('/browse/featured');
  };

  render() {
    return (
      <Wrapper>
        <i className="fas fa-music" />
        <h1>It's a bit empty here...</h1>
        <h4>Find more of the playlists you love in Browser and save to your Library</h4>
        <Button onClick={this.clickHandler}>BROWSE</Button>
      </Wrapper>
    );
  }
}

export default withRouter(CollecitonEmpty);

const Wrapper = styled.div`
  margin-top: 6rem;
  position: absolute;
  width: 100%;
  & > i {
    font-size: 50px;
    margin-bottom: 3rem;
    opacity: 0.5;
  }

  & > h1 {
    font-size: 48px;
    margin-bottom: 36px;
    font-weight: 700;
    color: white;
  }

  & > h4 {
    color: gray;
    margin-bottom: 36px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  border: none;
  padding: 0.8rem;
  outline: none;
  width: 10rem;
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: 2rem;
  margin: 1rem 0;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
    transform: scale(1.05);
    background: var(--color-primary-bright);
  }
`;
