import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container } from './styles';
import AisdeMenu from '~/components/AsideMenu';

const DefaultLayout = ({ children }) => {
  return (
    <Wrapper>
      <AisdeMenu />
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
