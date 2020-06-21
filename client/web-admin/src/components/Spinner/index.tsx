import * as React from 'react';

import { Container } from './styles';

interface SpinnerProps {
  small?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ small }) => {
  return (
    <Container small={small} viewBox="-24 -24 48 48">
      <circle cx="0" cy="0" r="20" fill="none" strokeWidth="4" />
    </Container>
  );
};

export default Spinner;
