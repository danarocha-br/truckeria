import React from 'react';

import { Container } from './styles';

export interface TitleProps {
  title: string;
}

const Title: React.SFC<TitleProps> = ({ title }) => {
  return (
    <Container>
      <h2>{title}</h2>
      <hr />
    </Container>
  );
};

export default Title;
