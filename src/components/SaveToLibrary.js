import React, { Component } from "react";
import Storage from "../Storage";
import StorageContext from "./storageContext";
class SaveToLibrary extends Component {
   state = { saved: Storage.itemExists(this.props.type, this.props.item) };

   saveHandler = () => {
      const { type, item } = this.props;
      Storage.setItem(type, item);
      this.setState({ saved: true });
   };

   removeHandler = () => {
      const { type, item } = this.props;
      Storage.removeItem(type, item);
      this.setState({ saved: false });
   };

   childProps = contextHandler => {
      return {
         clickHandler: this.state.saved
            ? () => {
                 this.removeHandler();
                 contextHandler();
              }
            : () => {
                 this.saveHandler();
                 contextHandler();
              },
         ...this.state
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
