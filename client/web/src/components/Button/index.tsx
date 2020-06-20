import React, { ButtonHTMLAttributes, useContext } from 'react';
import { ThemeContext } from 'styled-components';

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
          {...rest}
        >
          {label}
          {Icon && <Icon />}
          {isLoading && <Spinner />}
        </Container>
      )}

      {Icon && action && (
        <IconContainer>
          <Shape />
          <Icon color={theme.colors.text} size="24" />
        </IconContainer>
      )}
    </>
  );
};

Button.defaultProps = {
  type: 'submit',
};

export default Button;
