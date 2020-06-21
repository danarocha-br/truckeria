import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import { transparentize } from 'polished';
import breakpoint from 'styled-components-breakpoint';

interface StateProps {
  isActive?: boolean;
}

export const Wrapper = styled.div<StateProps>`
  ${tw`flex flex-col w-full rounded-md items-center`};
  border: 1px solid ${(props) => props.theme.colors.shade};
  background-color: ${(props) =>
    transparentize(0.3, props.theme.colors.tabbar)};
  transition: all 0.3s;

  ${(props) =>
    props.isActive &&
    css`
      border-color: ${props.theme.colors.primary};
      background-color: ${transparentize(0.1, props.theme.colors.tabbar)};
    `}

  ${breakpoint('desktop')`
    ${tw`flex-row ml-4 `};
  `}
`;

export const Date = styled.div`
  ${tw`flex items-center py-1 px-2 w-full rounded-t-md relative`}
  background-color: ${(props) => props.theme.colors.base};
  transition: background-color 0.3s;

  ${breakpoint('desktop')`
    ${tw`flex-col py-4 px-6 h-full text-center justify-center rounded-l-md`};
    border-top-right-radius: 0 !important;
    max-width: 80px;
  `}

  svg {
    ${tw`mx-2`};
  }

  p:first-child {
    ${breakpoint('desktop')`
      ${tw`font-bold text-2xl mb--2 ml-0`};
    `}
  }
  p:last-child {
    ${tw`text-sm ml-2 mr-auto`};

    ${breakpoint('desktop')`
      ${tw`ml-0`};
    `}
  }

  small {
    ${tw`absolute`};
    right: 14px;
  }

`;

export const Info = styled.div`
  ${tw`py-4 px-6 w-full relative`};

  address {
    ${tw`font-bold not-italic`};
  }

  span {
    ${tw`flex font-semibold`};

    small:first-child {
      margin-right: auto;
      flex: 1;
    }

    small:last-child {
      ${tw`hidden`};
    }

    ${breakpoint('desktop')`

     small:last-child {
      ${tw`block absolute`};
      transition: transform ease-out 0.3s;
      right: -40px;

      &::before {
        content: '•';
        padding-right: 8px;
      }
    }
  `}
  }

  > svg {
    ${tw`absolute opacity-25`};
    bottom: 18px;
    right: 8px;
  }
`;

export const Actions = styled.div`
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

export const Container = styled.li<StateProps>`
  ${tw`flex items-center w-full cursor-pointer mb-4`};
  color: ${(props) => props.theme.colors.text};

  > svg {
    ${tw`hidden`};

    ${breakpoint('desktop')`
      ${tw`mr-auto block`};
      max-width: 25px;
    `}
  }

  &:hover ${Wrapper} {
    background-color: ${(props) =>
      transparentize(0.1, props.theme.colors.tabbar)};
  }

  &:hover ${Date} {
    background-color: ${(props) =>
      transparentize(0.1, props.theme.colors.base)};
  }



  &:hover ${Info} {
    small:last-child {
      transform: translateX(-50px);
    }
  }

  ${(props) =>
    props.isActive &&
    css`
      ${Info} {
        small:last-child {
          transform: translateX(-50px);
        }
      }
    `}

  &:hover ${Actions} {
    ${breakpoint('desktop')`
       ${tw`opacity-100 mr-6`};
    `}
  }

  ${(props) =>
    props.isActive &&
    css`
      ${Actions} {
        ${breakpoint('desktop')`
        ${tw`opacity-100 mr-6`};
      `}
      }
    `}
`;
