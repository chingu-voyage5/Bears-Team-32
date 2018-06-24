import React, { Component } from 'react';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
class OtherResult extends Component {
  cardProps = result => {
    const { type } = this.props;
    const baseProps = {
      image: result.images[0].url,
      name: result.name,
      type: type === 'artist' ? null : 'album',
    };
    if (type === 'album') {
      return {
        ...baseProps,
        artists: result.artists,
      };
    } else if (type === 'artist') {
      return {
        ...baseProps,
        circle: 'circle',
      };
    } else {
      return {
        ...baseProps,
        artists: [{ name: result.owner.display_name }],
      };
    }
  };
  getCardByType = result => {
    // TODO: return placholder image if result has no image
    return result.images.length > 0 ? <Card {...this.cardProps(result)} /> : result.name;
  };

  addRecentSearch = result => {
    let record = {
      type: this.props.type,
      name: result.name,
      id: result.id,
    };

    let currentItems = JSON.parse(localStorage.getItem('bears-team-32')) || [];
    if (currentItems.length === 4) {
      currentItems.pop();
    }
    currentItems.unshift(record);
    localStorage.setItem('bears-team-32', JSON.stringify(currentItems));
  };

  render() {
    const { type, results } = this.props;
    return (
      <Layout header={type} bgColor="black">
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

export default OtherResult;
