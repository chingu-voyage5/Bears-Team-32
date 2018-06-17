import React, { Component } from 'react';
import SearchResult from '../containers/SearchResult';
class TopResult extends Component {
  render() {
    const { results } = this.props;
    return (
      <div>
        {results.map(result => (
          <SearchResult data={result.value} type={result.type} key={result.type} />
        ))}
      </div>
    );
  }
}

export default TopResult;
