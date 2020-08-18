import React from 'react';

import Skeleton from './index';

export default {
  title: 'List/Skeleton',
  component: Skeleton,
};

export const SkeletonComponent = (args) => <Skeleton {...args} />;
SkeletonComponent.args = {
  key: 'id',
};
