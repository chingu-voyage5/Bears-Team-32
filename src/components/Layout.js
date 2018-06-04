import React, { Component } from 'react';
import Card from '../components/Card';
import { WrapperSection, HeadingPrimary, WrapperMain } from '../components/style-utils';

class Layout extends Component {
  render() {
    return (
      <div>
        <WrapperMain>
          <WrapperSection>
            <HeadingPrimary>Recently Played</HeadingPrimary>
            <Card />
            <Card circle />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </WrapperSection>
          <WrapperSection>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </WrapperSection>
        </WrapperMain>
      </div>
    );
  }
}

export default Layout;
