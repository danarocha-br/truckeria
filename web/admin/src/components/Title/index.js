import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const Title = ({ title }) => {
  return (
    <Container>
      <h2>{title}</h2>
      <hr />
    </Container>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
