import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';

interface ItemProps {
  isActive?: boolean;
}

export const Item = styled.li<ItemProps>`
  ${tw`pb-8`}
  a {
    ${tw`flex items-center capitalize font-semibold relative w-full`};
    color: ${(props) => props.theme.colors.text};
    opacity: 0.6;

    &:after {
      ${tw`rounded absolute`}
      content: '';
      border: ${(props) => `1px solid ${props.theme.colors.primary}`};
      bottom: -5px;
      left: 40px;
      width: 0px;
      opacity: 0;
      transition: all 400ms ease;
    }

    ${(props) =>
      props.isActive &&
      css`
        width: 430px;
        opacity: 1;
        color: ${props.theme.colors.text};

        svg {
          color: ${props.theme.colors.primary};
        }

        &::after {
          width: 30px;
          opacity: 1;
        }
      `}

    &:hover::after {
      width: 35px;
      opacity: 1;
    }

    &:hover {
      opacity: 1;
      color: ${(props) => props.theme.colors.text};
    }

    &:hover svg {
      color: ${(props) => props.theme.colors.primary};
    }

    svg {
      ${tw`mr-4`}
    }
  }
`;
