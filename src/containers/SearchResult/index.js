import React from 'react';
import TrackResult from './TrackResult';
import TopResult from './TopResult';
import OtherResult from './OtherResult';
const SearchResult = ({ data, type }) => {
  const { items } = data;
  return type === 'result' ? (
    <TopResult results={items} />
  ) : type === 'track' ? (
    <TrackResult results={items} type={type} />
  ) : (
    <OtherResult type={type} results={items} />
  );
};

export default SearchResult;
