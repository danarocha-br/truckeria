import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.SFC<ButtonProps> = ({ label, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {label}
    </Container>
  );
};

export default Button;
