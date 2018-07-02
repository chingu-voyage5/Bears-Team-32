import React, { Component } from 'react';
import styled from 'styled-components';
import Storage from '../Storage';
import StorageContext from './storageContext';
class SaveButton extends Component {
  state = { saved: Storage.itemExists(this.props.type, this.props.item) };

  saveHandler = () => {
    const { type, item } = this.props;
    Storage.setItem(type, item);
  };

  removeHandler = () => {
    const { type, item } = this.props;
    Storage.removeItem(type, item);
  };

  render() {
    const { saved } = this.state;
    const handler = saved ? this.removeHandler : this.saveHandler;
    return (
      <StorageContext.Consumer>
        {context => (
          <Save
            saved={saved}
            onClick={() => {
              handler();
              context.handler();
            }}
          >
            {saved ? 'remove from your library' : 'save to your library'}
          </Save>
        )}
      </StorageContext.Consumer>
    );
  }
}

export default SaveButton;

const Save = styled.div`
  cursor: pointer;
  color: ${props => (props.saved ? 'green' : 'white')};
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
`;
