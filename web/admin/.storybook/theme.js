import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#CCAF81',
  colorSecondary: '#FF8D4D',

  appBg: '#20242A',
  appContentBg: '#ECEFF4',
  appBorderColor: '#4C5E80',
  appBorderRadius: 15,
  appTextColor: '#20242A',

  textColor: '#879AC0',
  fontBase: 'DM Sans, sans-serif',
  fontCode: 'monospace',

  // Toolbar default and active colors
  barTextColor: '#20242A',
  barSelectedColor: '#FF8D4D',
  barBg: '#DBE1EA',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 2,

  brandTitle: 'Truckeria Docs',
  brandUrl: 'https://www.danarocha.com.br/',
});
