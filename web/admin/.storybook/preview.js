import { configure, addParameters, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withThemesProvider } from "themeprovider-storybook";
import styles from "@sambego/storybook-styles";

import './reset.css';
import theme from './theme';
import light from "../src/styles/tokens/light";
import dark from "../src/styles/tokens/dark";

addParameters({
  // viewport: {
  //   viewports: INITIAL_VIEWPORTS,
  // },
  options: {
    theme,
  },
});

addDecorator(withA11y);
addDecorator(styles({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
}))

const themes = [dark, light];
addDecorator(withThemesProvider(themes));
