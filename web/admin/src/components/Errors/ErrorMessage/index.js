import React from 'react';
import PropTypes from 'prop-types';
import { FiAlertCircle } from 'react-icons/fi';

import { Container } from './styles';
import colors from '../../../styles/tokens/colors';

const ErrorMessage = ({ type, message }) => {
  return (
    <Container type={type}>
      <FiAlertCircle size="20" color={colors.red900} />
      <p>{message}</p>
    </Container>
  );
};

ErrorMessage.defaultProps = {
  type: 'form',
  message: '',
};

ErrorMessage.propTypes = {
  type: PropTypes.oneOf(['form']).isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
