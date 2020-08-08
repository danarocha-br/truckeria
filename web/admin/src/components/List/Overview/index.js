import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from 'styled-components';

import { Container } from './styles';
import colors from '../../../styles/tokens/colors';

const Overview = ({ icon: Icon, title, label, isLoading }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container isLoading={isLoading}>
      <span className="c-overview__icon">
        <Icon color={theme.colors.text} />
      </span>
      {isLoading ? (
        <SkeletonTheme color={colors.gray300} highlightColor={colors.gray100}>
          <Skeleton width={100} />
        </SkeletonTheme>
      ) : (
        <>
          <h2>{title}</h2>
          <small>{label}</small>
        </>
      )}
    </Container>
  );
};

Overview.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Overview;
