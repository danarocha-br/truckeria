import React, { useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeContext } from 'styled-components';

import { Container } from './styles';
import { listItems } from '../animations';

const SkeletonList = () => {
  const theme = useContext(ThemeContext);

  return (
    <Container variants={listItems}>
      <SkeletonTheme
        color={theme.colors.shade}
        highlightColor={theme.colors.tabbar}
        width={60}
      >
        <Skeleton circle={true} height={50} width={50} />
      </SkeletonTheme>

      <SkeletonTheme
        color={theme.colors.shade}
        highlightColor={theme.colors.tabbar}
        className="skeleton__group"
      >
        <Skeleton width={100} count={2} />
      </SkeletonTheme>
    </Container>
  );
};

export default SkeletonList;
