import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container } from './styles';
import Menu from '../../../components/Menu';

const DefaultLayout = ({ children }) => {
  return (
    <Wrapper>
      <Menu />
      <Container initial="hidden" animate="visible" exit="exit">
        {children}
      </Container>
    </Wrapper>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DefaultLayout;
