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
      type: type === 'artist' ? null : 'ablum',
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

  render() {
    const { type, results } = this.props;
    return (
      <Layout header={type}>
        {results.map(result => (
          <Link to={`/${type}/${result.id}`} key={result.id}>
            {this.getCardByType(result)}
          </Link>
        ))}
      </Layout>
    );
  }
}

export default OtherResult;
