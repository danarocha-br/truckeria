import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import breakpoint from 'styled-components-breakpoint';

export const Item = styled.li`
  ${breakpoint('tablet')`
    ${tw`pb-8 list-none break-words`};
    width: 215px;
  `}

  ${breakpoint('desktop')`
    ${tw`pb-8 break-words`};
    width: 215px;
  `}

  .active {
    opacity: 1;
    color: ${(props) => props.theme.colors.text};

    svg {
      color: ${(props) => props.theme.colors.primary};
    }

    &::after {
      width: 30px;
      opacity: 1;
    }
  }

  a {
    ${tw`flex flex-col items-center capitalize relative text-sm`};
    color: ${(props) => props.theme.colors.text};
    opacity: 0.6;

    ${breakpoint('tablet')`
      ${tw`flex-row font-semibold w-full text-base`};
    `}

    &:after {
      ${tw`rounded mt-1 invisible`}
      content: '';
      border: ${(props) => `1px solid ${props.theme.colors.primary}`};
      width: 0px;
      opacity: 0;
      transition: all 400ms ease;

      ${breakpoint('tablet')`
        ${tw`absolute visible`};
        left: 40px;
        bottom: -5px;
      `};
    }

    ${(props) =>
      props.isActive &&
      css`
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
      ${breakpoint('tablet')`
        ${tw`mr-4`};
        flex: none;
      `};
    }
  }
`;
