import React, { Component } from 'react';
import Storage from '../Storage';
import StorageContext from './storageContext';
class SaveToLibrary extends Component {
  saveHandler = () => {
    const { type, item } = this.props;
    Storage.setItem(type, item);
  };

  removeHandler = () => {
    const { type, item } = this.props;
    Storage.removeItem(type, item);
  };

  childProps = contextHandler => {
    const { type, item } = this.props;
    const saved = Storage.itemExists(type, item);
    return {
      clickHandler: saved
        ? () => {
            this.removeHandler();
            contextHandler();
          }
        : () => {
            this.saveHandler();
            contextHandler();
          },
      saved,
    };
  };

  render() {
    return (
      <StorageContext.Consumer>
        {context => this.props.children(this.childProps(context.handler))}
      </StorageContext.Consumer>
    );
  }
}

export default SaveToLibrary;
