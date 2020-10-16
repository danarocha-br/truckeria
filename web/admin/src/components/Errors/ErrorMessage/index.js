import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FiAlertCircle } from 'react-icons/fi';

import { Container } from './styles';
import colors from '../../../styles/tokens/colors';

const ErrorMessage = ({ type, message }) => {
  const [isOpen, setIsOpen] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(!isOpen)
    , 3000);
    return () => clearTimeout(timer);
  }, []);

  console.log(isOpen)

  return (
    <div>
     {isOpen && <Container
        type={type}
        layout
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      >
        <FiAlertCircle size="20" color={colors.red900} />
        <p>{message}</p>
      </Container>}
      </div>
  );
};

ErrorMessage.defaultProps = {
  type: 'form',
  message: '',
};

ErrorMessage.propTypes = {
  type: PropTypes.oneOf(['form']),
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
