import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const Tag = ({ label }) => {
  return <Container>{label}</Container>;
};

Tag.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Tag;
