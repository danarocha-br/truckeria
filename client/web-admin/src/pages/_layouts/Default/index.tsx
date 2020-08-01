import * as React from 'react';

import { Wrapper } from './styles';
import Menu from '../../../components/Menu/index.jsx';
import ContentWrapper from '../ContentWrapper';

const ContainerLayout: React.SFC = ({ children }) => {
  return (
    <Wrapper>
      <Menu />
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
};

export default ContainerLayout;
