import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const Form = ({ children }) => {
  return <Container>{children}</Container>;
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Form;
