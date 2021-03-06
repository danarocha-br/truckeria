import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

export default createGlobalStyle`

  body {
    -webkit-font-smoothing: antialiased;
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.base};
    font-weight: 500;

  }

  button, a {
    cursor: pointer;
  }

  button:focus, input:focus {
    outline: none;
  }

  a {
    color: ${(props) => props.theme.colors.accent};
    transition: color ease-in-out 300ms;

    &:hover {
      color: ${(props) => darken(0.2, `${props.theme.colors.accent}`)};
    }
  }
`;
