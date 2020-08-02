import { configure, addParameters, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';

import './reset.css';
import theme from './theme';

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  options: {
    theme,
  },
});

addDecorator(withA11y);
addDecorator(centered);


