import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';

interface UiStates {
  isFocused: boolean;
  hasValue: boolean | string | undefined;
  disabled?: boolean;
  hasError?: string | boolean;
  loading?: number;
  theme?: string;
}

/**
 * Global Classes for UI State Animations
 */

const inputBorder = `
  border: 8px solid;
  border-top-width: 2.2em;
  `;

const animateIcon = `
  translateZ(1px);`;

/**
 * Styling
 */
export const Container = styled.span.attrs({
  className:
    'relative flex items-center w-full align-top overflow-hidden border rounded-lg ',
})<UiStates>`
  border-color: ${(props) => props.theme.form.background};
  z-index: 1;
  opacity: ${(props) => (props.disabled || props.loading ? '0.5' : '1')};

  & + span {
   ${tw`my-4`}
  }

  &:hover:not([disabled])
   {
    border-color: ${(props) => props.theme.form.focus};;
    transition: border-color 0.5s;
  }

  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${props.theme.form.focus};
      transition: border-color 0.5s;
    `}

  ${(props) =>
    props.hasError &&
    css`
      border-color: ${props.theme.colors.error};
      transition: border-color 0.5s;
    `}

  & {
    input {
      ${tw`text-lg bg-transparent w-11/12 absolute flex float-right border-none z-40 focus:outline-none `}
    color: ${(props) => props.theme.form.text};;
        padding: 1.24em 1.4em 0;
        -webkit-appearance: none;
        opacity: ${(props) => (props.disabled || props.loading ? '0.5' : '1')};

    ${(props) =>
      props.isFocused &&
      css`
        + label:before {
          ${inputBorder}
          border-top-width: 1.8em;
          border-color: ${props.theme.form.shade};
        }

        + label > span {
          transform: translate3d(-0.8em, -1.5em, 0) scale3d(0.8, 0.8, 1);
        }

        + label > svg {
          ${animateIcon}
          transform: translate3d(-0.3em, -1.5em, 0) scale3d(0.85, 0.85, 1);
        }
      `}

    ${(props) =>
      props.hasValue &&
      css`
        + label:before {
          ${inputBorder}
          border-top-width: 1.8em;
          border-color: ${props.theme.form.shade};
        }

        + label > span {
          transform: translate3d(-0.8em, -1.5em, 0) scale3d(0.8, 0.8, 1);
        }

        + label > svg {
          ${animateIcon}
          transform: translate3d(-0.3em, -1.5em, 0) scale3d(0.85, 0.85, 1);
          color: ${props.theme.colors.primary};
        }
      `}

      ${(props) =>
        props.hasError &&
        css`
          + label:before {
            ${inputBorder}
            border-top-width: 1.8em;
            border-color: ${props.theme.form.shade};
          }

          + label > span {
            transform: translate3d(-0.8em, -1.5em, 0) scale3d(0.8, 0.8, 1);
          }

          + label > svg {
            ${animateIcon}
            transform: translate3d(-0.3em, -1.5em, 0) scale3d(0.85, 0.85, 1);
          }
        `}


    &:disabled + label > span {
      transform: translate3d(-0.4em, -1.5em, 0) scale3d(0.8, 0.8, 1);
    }

    &:focus + label > svg:first-child,
    &:disabled + label > svg:first-child {
      ${animateIcon}
      transform: translate3d(-0.3em, -1.5em, 0) scale3d(0.85, 0.85, 1);
      color: ${(props) => props.theme.colors.primary};;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }


  }

  & label {
    ${tw`font-medium text-left flex items-center w-full h-full float-right p-0`};
    color: ${(props) => props.theme.form.label};
    background-color: ${(props) => props.theme.form.background};;
    padding: 0 1em;
    -webkit-touch-callout: none;
    user-select: none;

    &::before {
      ${tw`border-solid border-transparent absolute top-0 left-0 w-full h-full`};
      content: '';
      transition: border-width 0.3s, border-color 0.3s;
    }

    & span {
      ${tw`flex w-full relative`};
      padding: 1.65em 1em;
      transition: transform;
      transition-duration: 0.3s;
      transform-origin: 0% 50%;
      text-rendering: geometricPrecision;
    }

    svg:first-child {
      transition: transform;
      transition-duration: 0.3s;
    }

    svg:last-child {
      ${tw`absolute`};
      right: 0px;
    }
  }

  .spinner {
    ${tw`absolute`};
    right: 8px;
    top: 5px;
  }

  input:disabled + label:before {
    border-color: ${(props) => props.theme.form.background};
  }
`;

export const Error = styled.div`
  ${tw`text-xs text-left pt-1 mb-3`}
  color: ${(props) => props.theme.colors.error};;
`;
