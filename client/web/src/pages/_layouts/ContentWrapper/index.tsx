import React from 'react';

import { Container } from './styles';

const ContentWrapper: React.SFC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ContentWrapper;
