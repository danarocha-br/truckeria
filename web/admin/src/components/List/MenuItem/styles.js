import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import { transparentize } from 'polished';
import breakpoint from 'styled-components-breakpoint';

import Image from '../../../assets/sign-in-background.png';

export const Actions = styled.li`
  ${tw`hidden`};
  transition: all ease 0.31s;

  ${breakpoint('desktop')`
     ${tw`flex opacity-0 relative`};
     transition: all ease 0.31s;
     right: 0;

     svg {
       ${tw`mx-4`}
     }
  `}
`;

export const Container = styled.li`
  ${tw`flex w-full rounded-md items-center py-2 px-4 font-bold mb-4`};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.shade};
  background-color: ${(props) =>
    transparentize(0.3, props.theme.colors.tabbar)};
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) =>
      transparentize(0.1, props.theme.colors.tabbar)};
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:hover ${Actions} {
    ${breakpoint('desktop')`
       ${tw`opacity-100 mr-6`};
    `}
  }

  &:hover .c-menu__price {
    transform: translateX(0px);
  }

  ${(props) =>
    props.isActive &&
    css`
      border-color: ${props.theme.colors.primary};
      background-color: ${transparentize(0.1, props.theme.colors.tabbar)};

      ${Actions} {
        ${breakpoint('desktop')`
          ${tw`opacity-100 mr-6`};
        `}
    `}

  .c-menu__price {
    ${tw`text-lg`};
    transition: transform 0.3s;

    ${breakpoint('desktop')`
      transform: translateX(100px);
    `}
  }
`;

export const Thumb = styled.div`
${tw`rounded-full bg-cover bg-center border-solid border-2 `}
    border-color: ${(props) => props.theme.colors.accent};
    width: 50px;
    height: 50px;
    background: url(${Image}) no-repeat;
    background-size: 100%;

    ${breakpoint('desktop')`
      min-width: 65px;
      min-height: 65px;
    `};
`;
