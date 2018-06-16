import React, { Component } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Track from '../components/Track';

class SearchResult extends Component {
  getCardByType = (type, item) => {
    if (item.images.length > 0) {
      let card;
      if (type === 'album') {
        card = (
          <Card type={type} image={item.images[0].url} name={item.name} artists={item.artists} />
        );
      } else if (type === 'artist') {
        card = <Card circle="yes, please" name={item.name} image={item.images[0].url} />;
      } else {
        card = <Card image={item.images[0].url} />;
      }
      return card;
    } else {
      return item.name;
    }
  };

  getItems = () => {
    const { items, type } = this.props;

    if (type === 'track') {
      const tracksPlaylist = items.map(track => {
        let artists = [];
        if (track.artists.length > 1) {
          track.artists.map(artist => {
            artists.push(artist.name);
          });
        } else {
          artists = [track.artists[0].name];
        }
        return (
          <Track
            type={type}
            key={track.id}
            artists={artists}
            trackName={track.name}
            albumName={track.album.name}
            trackDuration={track.duration_ms}
            explicit={track.explicit}
          />
        );
      });
      return tracksPlaylist;
    } else {
      return (
        <Layout header={type}>
          {items.map(item => (
            <Link to={`/${type}/${item.id}`} key={item.id}>
              {this.getCardByType(type, item)}
            </Link>
          ))}
        </Layout>
      );
    }
  };

  render() {
    return this.getItems();
  }
}

export default SearchResult;
