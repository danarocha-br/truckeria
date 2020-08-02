import { create } from '@storybook/theming';

export default create({
  base: 'dark',

  colorPrimary: '#CCAF81',
  colorSecondary: '#FF8D4D',

  appBg: '#1F2533',
  appContentBg: '#ECEFF4',
  appBorderColor: '#95A6AD',
  appBorderRadius: 20,
  appTextColor: '#1F2533',

  textColor: '#95A6AD',
  fontBase: '"DM Sans", sans-serif',
  fontCode: 'monospace',

  // Toolbar default and active colors
  barTextColor: '#1F2533',
  barSelectedColor: '#1F2533',
  barBg: '#DBE1EA',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Truckeria Docs',
  brandUrl: 'https://www.danarocha.com.br/',
});
