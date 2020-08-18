import React from 'react';

import SkeletonList from '../List/Skeleton';

const SkeletonGroup = () => {
  return (
    <>
      <SkeletonList key="1" />
      <SkeletonList key="2" />
      <SkeletonList key="3" />
      <SkeletonList key="4" />
      <SkeletonList key="5" />
      <SkeletonList key="6" />
    </>
  );
};

export default SkeletonGroup;
