import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const Link = ({ to, label }) => {
  return (
    <Container to={to}>
      {label} <span />
    </Container>
  );
};

Link.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default Link;
