import React, { ButtonHTMLAttributes, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';

import { Container, IconContainer } from './styles';
import { ReactComponent as Shape } from '../../assets/buttonShape.svg';
import Spinner from '../Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  /**
   * Transform button into primary action type.
   */
  action?: boolean;
  /**
   * To get an icon button type.
   */
  icon?: React.ComponentType<{ size?: string; color?: string }>;
  isLoading?: boolean;
}

const Button: React.SFC<ButtonProps> = ({
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
        >
          {label}
          {Icon && <Icon color={theme.colors.text} />}
          {isLoading && <Spinner />}
        </Container>
      )}

      {Icon && action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type={type}
          onClick={onClick}
        >
          <IconContainer>
            <Shape />
            <Icon color={theme.colors.white} size="24" />
          </IconContainer>
        </motion.button>
      )}
    </>
  );
};

Button.defaultProps = {
  type: 'submit',
};

export default Button;
