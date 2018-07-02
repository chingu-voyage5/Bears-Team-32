import React, { Component } from "react";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Storage from "../../Storage";
import { withRouter } from "react-router";
class OtherResult extends Component {
   cardProps = result => {
      const { type } = this.props;
      const baseProps = {
         image: result.images[0].url,
         name: result.name,
         type: type === "artist" ? null : "album"
      };
      if (type === "album") {
         alert("album");
         return {
            ...baseProps,
            artists: result.artists
         };
      } else if (type === "artist") {
         return {
            ...baseProps,
            circle: "circle"
         };
      } else {
         return {
            ...baseProps,
            artists: [{ name: result.owner.display_name }]
         };
      }
   };
   getCardByType = result => {
      // TODO: return placholder image if result has no image
      return result.images.length > 0 ? (
         <Card {...this.cardProps(result)} />
      ) : (
         result.name
      );
   };

   addRecentSearch = result => {
      const { pathname } = this.props.location;
      if (pathname.includes("search")) {
         let currentItems = Storage.getItems("recent");
         if (currentItems.filter(item => item.id === result.id).length === 0) {
            let newItem = {
               type: this.props.type,
               name: result.name,
               id: result.id
            };
            currentItems.length === 4 && currentItems.pop();
            currentItems.unshift(newItem);
            Storage.setItems("recent", currentItems);
         }
      }
   };

   render() {
      const { type, results, bgColor } = this.props;
      console.log(this.props);
      return (
         <Layout header={type} bgColor={bgColor || "black"}>
            {results.map(result => (
               <Link
                  to={`/${type}/${result.id}`}
                  key={result.id}
                  onClick={() => this.addRecentSearch(result)}
               >
                  {this.getCardByType(result)}
               </Link>
            ))}
         </Layout>
      );
   }
}

export default withRouter(OtherResult);
