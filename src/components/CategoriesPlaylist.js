import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { HeadingSecondary } from "./style-utils";

const url = "https://jffy-api.herokuapp.com/api/v1/spotify/?query";

class CategoriesPlaylist extends Component {
   state = {
      playlists: [],
      artists: []
   };
   componentDidMount() {
      const { match } = this.props;
      const category = match.params.id;
      Promise.all([
         this.fetchCategoryPlaylist(category),
         this.fetchCategoryArtist(category)
      ]).then(values => {
         let [playlists, artists] = values;
         console.log("values", artists);
         this.setState({
            playlists: playlists.data.playlists.items,
            artists: artists.data.artists.items
         });
      });
   }

   fetchCategoryPlaylist = category => {
      const query = `https://api.spotify.com/v1/browse/categories/${category}/playlists`;
      return axios.get(`${url}=${query}`);
   };

   fetchCategoryArtist = category => {
      return axios.get(
         `https://jffy-api.herokuapp.com/api/v1/spotify/?query=https://api.spotify.com/v1/search?query=*+genre:${category}%26type=artist%26limit=50`
      );
   };

   renderPlaylist = category => {
      return (
         <Fragment>
            <HeadingSecondary>Popular {category} Playlists</HeadingSecondary>
            {this.state.playlists.map(item => {
               return (
                  <Link key={item.id} to={`/${item.type}/${item.id}`}>
                     <Card image={item.images[0].url} name={item.name} />
                  </Link>
               );
            })}
         </Fragment>
      );
   };
   compare = (a, b) => {
      let comparison = 0;
      let x = b.popularity;
      let y = a.popularity;

      if (x > y) {
         return 1;
      } else if (x < y) {
         return -1;
      }

      return comparison;
   };

   filterArtist = artists => {
      return artists.sort(this.compare).slice(0, 20);
   };

   renderArtists = category => {
      if (this.state.artists.length > 0) {
         return (
            <Fragment>
               <HeadingSecondary>
                  {this.renderHeading(category) &&
                     `Popular ${category} Artists`}
               </HeadingSecondary>
               {this.filterArtist(this.state.artists).map(item => {
                  return (
                     <Link key={item.id} to={`/${item.type}/${item.id}`}>
                        <Card
                           circle="yes"
                           image={item.images[0] && item.images[0].url}
                           name={item.name}
                        />
                     </Link>
                  );
               })}
            </Fragment>
         );
      } else {
         return null;
      }
   };

   categoriesHeading = [
      { pop: "Pop Idols" },
      { rock: "Rock Gods" },
      { indie: "Indie Voices" },
      { jazz: "Jazz Masters" },
      { soul: "Soul Idols" }
   ];

   renderHeading = category => {
      return this.categoriesHeading.map(item => {
         if (Object.keys(item).includes(category)) return Object.values(item);
      });
   };

   render() {
      const category = this.props.match.params.id;

      return (
         <Layout header={category}>
            {this.renderPlaylist(category)}
            {this.renderArtists(category)}
         </Layout>
      );
   }
}

export default CategoriesPlaylist;
