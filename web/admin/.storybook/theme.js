import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#CCAF81',
  colorSecondary: '#FF8D4D',

  appBg: '#1F2533',
  appContentBg: '#D5DCEB',
  appBorderColor: '#4C5E80',
  appBorderRadius: 15,
  appTextColor: '#1F2533',

  textColor: '#879AC0',
  fontBase: 'DM Sans, sans-serif',
  fontCode: 'monospace',

  // Toolbar default and active colors
  barTextColor: '#1F2533',
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
