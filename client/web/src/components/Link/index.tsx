import React from 'react';
import { LinkProps } from 'react-router-dom';

import { Container } from './styles';

export interface Props extends LinkProps {
  label: string;
}

const Link: React.SFC<Props> = ({ to, label }) => {
  return <Container to={to}>{label}</Container>;
};

export default Link;
