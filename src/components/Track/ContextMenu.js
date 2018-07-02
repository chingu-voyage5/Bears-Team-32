import React, { Component } from 'react';
import styled from 'styled-components';
import SaveButton from '../SaveButton';
class ContextMenu extends Component {
  render() {
    const { pos, type, data } = this.props;
    return (
      <Wrapper pos={pos}>
        <div>Start Radio</div>
        <SaveButton type={type} item={data} />
        <div>Add to playlist</div>
      </Wrapper>
    );
  }
}

export default ContextMenu;

const Wrapper = styled.div`
  position: absolute;
  background: #282828;
  color: gray;
  text-align: left;
  top: ${props => `${props.pos.top}px`};
  left: ${props => `${props.pos.left}px`};
  z-index: 999;
  & div {
    padding: 1rem 1.5rem;
    cursor: pointer;
    &:hover {
      background: #333;
      color: white;
    }
  }
`;
