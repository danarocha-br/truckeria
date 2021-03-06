import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      base: string;
      shade: string;
      tabbar: string;
      greyMd: string;
      greyLight: string;
      white: string;
      accent: string;
      text: string;
      error: string;
      formPanel: string;
    };

    form: {
      background: string;
      icon: string;
      label: string;
      text: string;
      focus: string;
      shade: string;
    };

    button: {
      success: string;
    };
  }
}
