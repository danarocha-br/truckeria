import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  body {
    -webkit-font-smoothing: antialiased;

    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.base};

  }

  button, a {
    cursor: pointer;
  }
`;
