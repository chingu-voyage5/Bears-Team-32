import React, { Component } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Layout from '../components/Layout';

class HomeResult extends Component {
  state = { data: [] };

  componentDidMount() {
    axios.get(this.props.api).then(({ data }) => {
      this.setState({ data: data.items });
    });
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
