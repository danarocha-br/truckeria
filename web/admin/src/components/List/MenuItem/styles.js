import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import { transparentize } from 'polished';
import breakpoint from 'styled-components-breakpoint';
import { motion } from 'framer-motion';

import Image from '~/assets/sign-in-background.png';

export const Actions = styled.span`
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

export const Container = styled(motion.li)`
  ${tw`flex flex-col w-full rounded-md  py-2 px-4 font-bold mb-4`};
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

  .c-menu__description {
    ${tw`text-sm mt-2`};
    max-height: 57px;
    line-height: 1.35;
    overflow: hidden;

    p {
      font-weight: 400;
    }
  }
`;

export const Thumb = styled.div`
  ${tw`rounded-full bg-cover border-solid border-2 `}
    border-color: ${(props) => props.theme.colors.accent};
    width: 50px;
    height: 50px;
    background: url(${props => props.thumb ? props.thumb : Image}) no-repeat center center;

    ${breakpoint('desktop')`
      width: 65px;
      height: 65px;
    `};
`;

export const Categories = styled.div`
  ${tw`w-full text-xs mt-3 mb-2`};
  font-weight: 400;
  margin-left: 80px;

  ${breakpoint('desktop')`
    margin-left: 97px;
  `};

  span {
    ${tw`mr-2  px-3 rounded-md`};
    border: 1px solid;
    border-color: ${props => transparentize(0.5, props.theme.form.success)};
    padding-top: 2px;
    padding-bottom: 2px;
  }

`;
