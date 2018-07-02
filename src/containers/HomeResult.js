import React, { Component } from 'react';
import axios from 'axios';
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

  getItems = () => {
    return this.state.data.map(item => {
      const imgSrc = item.images ? item.images[0].url : item.icons[0].url;
      return <Card image={imgSrc} name={item.name} key={item.id} />;
    });
  };

  render() {
    return <Layout header={this.props.name}>{this.getItems()}</Layout>;
  }
}

export default HomeResult;
