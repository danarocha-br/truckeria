import { lighten } from 'polished';

import colors from './colors';

export default {
  title: 'light',

  colors: {
    primary: colors.red900,

    base: colors.gray100,
    shade: colors.gray500,
    tabbar: colors.white,
    greyMd: colors.gray500,
    greyLight: colors.gray100,
    white: colors.white,
    accent: colors.blue300,
    text: colors.gray900,
    error: colors.red900,
  },

  form: {
    background: colors.gray200,
    icon: colors.gray500,
    label: colors.gray800,
    text: colors.gray900,
    focus: colors.orange900,
    shade: lighten(0.2, colors.gray100),
  },

  button: {
    success: colors.green900,
  },
};
