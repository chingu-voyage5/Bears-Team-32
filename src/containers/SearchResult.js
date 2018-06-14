import React, { Component } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import moment from 'moment';
import styled from 'styled-components';
import { HeadingPrimary } from '../components/style-utils';

const TracksWrapper = styled.div`
  width: 100%;
  padding: 0 6rem;
  box-sizing: border-box;
`;

const TrackHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & > div:last-of-type {
    color: gray;
  }
`;
const TrackDesc = styled.div`
  text-align: left;
  color: gray;
  padding-top: 0.5rem;
  padding-bottom: 2rem;
`;

const Track = ({ item }) => {
  return (
    <React.Fragment>
      <TrackHeader>
        <div>{item.name}</div>
        <div>{moment(item.duration_ms).format('m:ss')}</div>
      </TrackHeader>
      <TrackDesc>{`${item.artists[0].name}.${item.album.name}`}</TrackDesc>
    </React.Fragment>
  );
};

class SearchResult extends Component {
  getItems = ({ items, type }) => {
    if (type === 'track') {
      return (
        <TracksWrapper>
          <HeadingPrimary>{type}</HeadingPrimary>
          {items.map(item => <Track item={item} key={item.id} />)}
        </TracksWrapper>
      );
    } else {
      return (
        <Layout header={type}>
          {items.map(item => (
            <Link to={`/${type}/${item.id}`} key={item.id}>
              {item.images.length > 0 ? <Card circle image={item.images[0].url} /> : item.name}
            </Link>
          ))}
        </Layout>
      );
    }
  };

  render() {
    return this.getItems(this.props);
  }
}

export default SearchResult;
