import styled, { keyframes } from 'styled-components';
import tw from 'tailwind.macro';

import colors from '../../styles/themes/colors';

const blob = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.12, 1.12);
  }
  60% {
    transform: scale(1);
  }
`;

export const Container = styled.label`
  ${tw`cursor-pointer`};
  height: 28px;

  input {
    ${tw`hidden`};

    & + span {
      ${tw`rounded-full block relative`};
      background: ${colors.gray700};
      width: 48px;
      height: 28px;
      transition: all 0.3s ease;

      &:before,
      &:after {
        ${tw`block absolute`};
        content: '';
        transition: all 0.3s ease;
      }
      &:before {
        ${tw`rounded-full`};
        top: 5px;
        left: 5px;
        width: 18px;
        height: 18px;
        border: 5px solid;
        border-color: ${(props) => props.theme.colors.primary};
      }

      &:active {
        transform: scale(0.92);
      }
    }
    &:checked {
      & + span {
        background: ${colors.gray200};
        &:before {
          ${tw`rounded-full`};
          width: 18px;
          height: 18px;
          margin-left: 20px;
          border-width: 5px;
          background: ${(props) => props.theme.colors.primary};
          transform: scale(1);
        }
      }
    }
    &:not(:checked) {
      & + span {
        &:before {
          animation: ${blob} 0.85s linear forwards 0.2s;
        }
      }
    }
  }
`;
