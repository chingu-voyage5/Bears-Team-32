import React, { Component } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

class SearchResult extends Component {
  render() {
    const { items, type } = this.props;
    return (
      <div>
        {items.map(item => {
          return (
            <Link to={`/${type}/${item.id}`} key={item.id}>
              {item.images.length > 0 ? <Card circle image={item.images[0].url} /> : item.name}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default SearchResult;
