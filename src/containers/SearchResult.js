import React, { Component } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Tracks from '../components/Tracks';
import TopResult from '../components/TopResult';
class SearchResult extends Component {
  getCardByType = (type, item) => {
    if (item.images.length > 0) {
      if (type === 'album') {
        return (
          <Card type={type} image={item.images[0].url} name={item.name} artists={item.artists} />
        );
      } else if (type === 'artist') {
        return <Card circle="yes, please" name={item.name} image={item.images[0].url} />;
      } else {
        return <Card image={item.images[0].url} />;
      }
    } else {
      return item.name;
    }
  };

  getItems = () => {
    const { data, type } = this.props;
    const { items } = data;
    if (type === 'result') {
      return <TopResult results={items} />;
    } else if (type === 'track') {
      return <Tracks tracks={items} type={type} />;
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
