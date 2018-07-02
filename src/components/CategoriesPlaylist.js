import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import Card from "../components/Card";
const url = "https://jffy-api.herokuapp.com/api/v1/spotify/?query";

class CategoriesPlaylist extends Component {
   state = {
      categoriesPlaylists: []
   };

   componentDidMount() {
      const { match } = this.props;
      const query = `https://api.spotify.com/v1/browse/categories/${
         match.params.id
      }/playlists`;
      axios.get(`${url}=${query}`).then(({ data }) => {
         console.log("CAtegories DATA", data.playlists.items);
         this.setState({ categoriesPlaylists: data.playlists.items });
      });
   }

   render() {
      return (
         <Layout header={this.props.match.params.id}>
            {this.state.categoriesPlaylists.map(item => {
               return (
                  <Link key={item.id} to={`/${item.type}/${item.id}`}>
                     <Card image={item.images[0].url} name={item.name} />
                  </Link>
               );
            })}
         </Layout>
      );
   }
}

export default CategoriesPlaylist;
