import { addParameters, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withThemesProvider } from 'themeprovider-storybook';
import styles from '@sambego/storybook-styles';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import './reset.css';
import '../src/assets/css/tailwind.output.css';
import theme from './theme';
import light from '../src/styles/tokens/light';
import dark from '../src/styles/tokens/dark';

const themes = [dark, light];
addDecorator(withThemesProvider(themes));

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  options: {
    theme,
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

addDecorator(withA11y);
addDecorator(
  styles({
    display: 'flex',
    height: '100vh',
    width: '100vw',
    padding: '0px',
    justifyContent: 'center',
  })
);
