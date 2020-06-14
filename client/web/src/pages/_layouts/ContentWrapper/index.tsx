import React from 'react';

import { Container, ColLeft, ColRight } from './styles';

export interface ContentWrapperProps {}

const ContentWrapper: React.SFC<ContentWrapperProps> = ({ children }) => {
  return (
    <Container>
      {children}
      <ColLeft />
      <ColRight />
    </Container>
  );
};

export default ContentWrapper;
