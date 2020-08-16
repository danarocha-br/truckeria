import React from 'react';
import { FiPieChart } from 'react-icons/fi';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Container, Thumb, List } from './styles';
import Overview from '../../../components/List/Overview';
import { PropTypes } from 'prop-types';
import colors from '../../../styles/tokens/colors';

const MenuOverview = ({ isLoading }) => {
  return (
    <Container>
      <h1>Menu Overview</h1>
      {isLoading ? (
        <SkeletonTheme color={colors.gray300} highlightColor={colors.gray100}>
          <Skeleton width={'100%'} height={250} />
        </SkeletonTheme>
      ) : (
        <Thumb />
      )}
      <hr />
      <List>
        <Overview
          icon={FiPieChart}
          title="25"
          label="Total Items"
          isLoading={isLoading}
        />
        <Overview
          icon={FiPieChart}
          title="25"
          label="Total Items"
          isLoading={isLoading}
        />
        <Overview
          icon={FiPieChart}
          title="25"
          label="Total Items"
          isLoading={isLoading}
        />
        <Overview
          icon={FiPieChart}
          title="25"
          label="Total Items"
          isLoading={isLoading}
        />
      </List>
    </Container>
  );
};

MenuOverview.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default MenuOverview;
