import * as React from 'react';

import { Wrapper } from './styles';
import Menu from '../../../components/Menu';
import ContentWrapper from '../ContentWrapper';

export interface ContainerLayoutProps {}

const ContainerLayout: React.SFC<ContainerLayoutProps> = () => {
  return (
    <Wrapper>
      <Menu />
      <ContentWrapper />
    </Wrapper>
  );
};

export default ContainerLayout;
