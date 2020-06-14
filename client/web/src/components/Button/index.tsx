import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.SFC<ButtonProps> = ({ label, type, ...rest }) => {
  return (
    <Container type={type} {...rest}>
      {label}
    </Container>
  );
};

Button.defaultProps = {
  type: 'submit',
};

export default Button;
