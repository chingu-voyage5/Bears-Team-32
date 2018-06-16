import React, { Component } from 'react';
import { WrapperSection, HeadingPrimary, WrapperMain } from '../components/style-utils';

class Layout extends Component {
  render() {
    return (
      <div>
        <WrapperMain>
          <WrapperSection>
            <HeadingPrimary>{this.props.header}</HeadingPrimary>
            {this.props.children}
          </WrapperSection>
        </WrapperMain>
      </div>
    );
  }
}

export default Layout;
