import React, { Component, Fragment } from "react";
import axios from "axios";
import axiosHome from "../components/axios-home";
import { Route, NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Card from "../components/Card";
import Layout from "../components/Layout";

class HomeResult extends Component {
   state = { data: [], categoriesPlaylist: null, categoriesURL: null };

   componentDidMount() {
      axios.get(this.props.api).then(({ data }) => {
         this.setState({ data: data.items });
      });
   }

   cardProps = result => {
      const { type } = this.props;
      const baseProps = {
         image: result.images ? result.images[0].url : result.icons[0].url,
         name: result.name,
         type: type === "artist" ? null : "album",
         artists: result.artists ? result.artists : null
      };
      return baseProps;
   };
   getCardByType = result => {
      return <Card {...this.cardProps(result)} />;
   };

   getItems = () => {
      return this.state.data.map(item => {
         return (
            <Fragment>
               {item.type ? (
                  <Link key={item.id} to={`/${item.type}/${item.id}`}>
                     {this.getCardByType(item)}
                  </Link>
               ) : (
                  <Link key={item.id} to={`/categories/${item.id}/playlists`}>
                     {this.getCardByType(item)}
                  </Link>
               )}
            </Fragment>
         );
      });
   };

   render() {
      return <Layout header={this.props.name}>{this.getItems()}</Layout>;
   }
}

export default withRouter(HomeResult);
