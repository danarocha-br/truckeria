import React from 'react';
import StoryRouter from 'storybook-react-router';

import Setup from '../FoodTruckSetup';

export default {
  title: 'Pages/FoodTruck Setup',
  decorators: [StoryRouter()],
};

export const FoodTruckSetup = () => <Setup />;
