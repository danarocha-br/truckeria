import React from 'react';
import PropTypes from "prop-types";

import { Wrapper, Container } from './styles';
// import Menu from '../../../components/Menu/index.jsx';


const DefaultLayout = ({ children }) => {
  return (
    <Wrapper>
      {/* <Menu /> */}
      <Container>{children}</Container>
    </Wrapper>
  );
};


DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default DefaultLayout;
