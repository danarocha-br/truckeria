import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';

import { Container, IconContainer } from './styles';
import { ReactComponent as ShapeDark } from '../../assets/buttonShape.svg';
import { ReactComponent as ShapeLight } from '../../assets/buttonShapeLight.svg';
import Spinner from '../Spinner';

const Button = ({
  label,
  type,
  icon: Icon,
  action,
  isLoading,
  disabled,
  onClick,
  ...rest
}) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      {!action && (
        <Container
          type={type}
          Icon={Icon}
          disabled={disabled}
          isLoading={isLoading}
          onClick={onClick}
          {...rest}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
        >
          {label}
          {Icon && !isLoading && <Icon color={theme.colors.text} />}
          {isLoading && <Spinner />}
        </Container>
      )}

      {Icon && action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type={type}
          onClick={onClick}
          style={{ border: 'none', backgroundColor: 'transparent' }}
        >
          <IconContainer isLoading={isLoading} disabled={disabled}>
            {theme.name === 'Dark' ? <ShapeDark /> : <ShapeLight />}

            {!isLoading && <Icon color={theme.colors.white} size="24" />}
            {isLoading && <Spinner />}
          </IconContainer>
        </motion.button>
      )}
    </>
  );
};

Button.defaultProps = {
  type: 'submit',
};

Button.propTypes = {
  /** My description here */
  label: PropTypes.string,
  action: PropTypes.bool,
  icon: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Button;
