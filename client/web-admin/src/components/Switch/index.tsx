import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

export type SwitchProps = InputHTMLAttributes<HTMLInputElement>;

const Switch: React.SFC<SwitchProps> = (props) => {
  return (
    <Container htmlFor="switch">
      <input id="switch" type="checkbox" {...props} />
      <span />
    </Container>
  );
};

export default Switch;
