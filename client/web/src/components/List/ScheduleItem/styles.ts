import styled from 'styled-components';
import tw from 'tailwind.macro';
import { transparentize } from 'polished';

interface StateProps {
  isActive?: boolean;
}

export const Wrapper = styled.div`
  ${tw`flex flex-1 w-full rounded-md ml-4 items-center`};
  border: 1px solid ${(props) => props.theme.colors.shade};
  background-color: ${(props) =>
    transparentize(0.3, props.theme.colors.tabbar)};
  transition: all 0.3s;

  /* &:hover {
    border-color: ${(props) => transparentize(0.9, props.theme.colors.primary)};
  } */
`;

export const Date = styled.div`
  ${tw`py-4 px-6 text-center rounded-l-md`}
  background-color: ${(props) => props.theme.colors.base};
  transition: background-color 0.3s;

  p:first-child {
    ${tw`text-2xl font-bold mb--2`};
  }
  p:last-child {
    ${tw`text-sm `};
  }
`;

export const Info = styled.div`
  ${tw`py-4 px-6 w-full relative`}

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
      ${tw`absolute`};
      right: 20px;
      transition: transform ease-out 0.3s;

      &::before {
        content: '•';
        padding-right: 8px;
      }
    }
  }
`;

export const Container = styled.li<StateProps>`
  ${tw`flex items-center w-full cursor-pointer`};
  color: ${(props) => props.theme.colors.text};

  svg {
    ${tw`mr-auto`};
    max-width: 25px;
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
      transform: translateX(-60px);
    }
  }
`;
