import React, { Component } from 'react';
import { WrapperSection, HeadingPrimary, WrapperMain } from '../components/style-utils';
import styled from 'styled-components';
class Layout extends Component {
  static defaultProps = {
    bgcolor: 'none',
  };
  render() {
    return (
      <Wrapper bgColor={this.props.bgColor}>
        <WrapperMain>
          <WrapperSection>
            <HeadingPrimary>{this.props.header}</HeadingPrimary>
            {this.props.children}
          </WrapperSection>
        </WrapperMain>
      </Wrapper>
    );
  }
}

export default Layout;

const Wrapper = styled.div`
  background: ${props => props.bgColor};
`;
