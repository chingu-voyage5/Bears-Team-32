import React, { Component, Fragment } from 'react';
import axios from 'axios';
import axiosHome from '../components/axios-home';
import { Route, NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Card from '../components/Card';
import Layout from '../components/Layout';

class HomeResult extends Component {
  state = { data: [] };
  source = axios.CancelToken.source();
  componentDidMount() {
    axios
      .get(this.props.api, {
        cancelToken: this.source.token,
      })
      .then(({ data }) => {
        this.setState({ data: data.items });
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled :', error.message);
        } else {
          console.log(error.message);
        }
      });
  }

  componentWillUnmount() {
    // Cancel request when component is unmounting before request is completed
    this.source.cancel(`Operation canceled by the user.`);
  }

  cardProps = result => {
    const { type } = this.props;
    const baseProps = {
      image: result.images ? result.images[0].url : result.icons[0].url,
      name: result.name,
      type: type === 'artist' ? null : 'album',
      artists: result.artists ? result.artists : null,
    };
    return baseProps;
  };
  getCardByType = result => {
    return <Card {...this.cardProps(result)} />;
  };

  getItems = () => {
    return this.state.data.map(item => {
      return (
        <Fragment key={item.id}>
          {item.type ? (
            <Link to={`/${item.type}/${item.id}`}>{this.getCardByType(item)}</Link>
          ) : (
            <Link to={`/categories/${item.id}/playlists`}>{this.getCardByType(item)}</Link>
          )}
        </Fragment>
      );
    });
  };

  render() {
    return <Layout header={this.props.name}>{this.getItems()}</Layout>;
  }
}

export default withRouter(HomeResult);
