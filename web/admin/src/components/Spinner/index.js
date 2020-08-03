import * as React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const Spinner = ({ small }) => {
  return (
    <Container small={small} viewBox="-24 -24 48 48">
      <circle cx="0" cy="0" r="20" fill="none" strokeWidth="4" />
    </Container>
  );
};

Spinner.propTypes = {
  small: PropTypes.bool,
};

Spinner.defaultProps = {
  small: false,
};

export default Spinner;
