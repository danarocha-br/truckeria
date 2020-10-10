import React from 'react';
import StoryRouter from 'storybook-react-router';

import Menu from './index';

export default {
  title: 'Navigation/Menu',
  component: Menu,
  decorators: [StoryRouter()],
};

export const MenuComponent = (args) => <Menu {...args} />;
MenuComponent.args = {
  isLoading: false,
};
