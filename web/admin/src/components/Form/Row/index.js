import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const Row = ({ children }) => {
  return <Container>{children}</Container>;
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Row;
