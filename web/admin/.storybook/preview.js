import { configure, addParameters, addDecorator } from '@storybook/react';
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import centered from '@storybook/addon-centered/react';
import { withA11y } from '@storybook/addon-a11y';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import './reset.css';
import theme from './theme';
import light from "../src/styles/tokens/light";
import dark from "../src/styles/tokens/dark";

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

const themes = [light, dark];
// addDecorator(withThemesProvider(themes));
