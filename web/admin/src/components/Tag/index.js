import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import colors from '../../styles/tokens/colors';

import { Container } from './styles';

const Tag = ({ label, isLoading }) => {
  return (
    <Container>
      {isLoading ? (
        <SkeletonTheme color={colors.gray200} highlightColor={colors.gray100}>
          <Skeleton width={30} />
        </SkeletonTheme>
      ) : (
        label
      )}
    </Container>
  );
};

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default Tag;
