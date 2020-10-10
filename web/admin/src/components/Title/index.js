import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const Title = ({ title, total }) => {
  return (
    <Container>
      <h2>{title}</h2>
      <p>{total} schedule(s)</p>
    </Container>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number
};

export default Title;
