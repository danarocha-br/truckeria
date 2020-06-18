import styled from 'styled-components';
import tw from 'tailwind.macro';
import { darken } from 'polished';
import breakpoint from 'styled-components-breakpoint';

export const Container = styled.nav`
  ${tw`flex w-full justify-between pt-3 px-4 fixed bottom-0 rounded-t-lg`};
  background-color: ${(props) => props.theme.colors.base};
  height: 64px;
  z-index: 100;

  .logo {
    ${tw`hidden mt-2`};
  }

  label:first-child {
    ${tw`absolute right-0 mr-4 mt--2`};
    transform: scale(0.7);
  }

  ${breakpoint('tablet')`
    ${tw`relative h-screen flex-col w-1/4 p-6 `};
    width: 200px;

    .logo {
      display: block;
      width: 126px;
    }
  `}

  ${breakpoint('desktop')`
     width: 260px;

    .logo {
      width: 156px;
    }
  `}
`;

export const List = styled.ul`
  ${tw`flex w-full items-center justify-between`};

  ${breakpoint('tablet')`
     display: initial;
  `}
`;

export const Profile = styled.div`
  ${tw`w-full items-center hidden`}

  ${breakpoint('tablet')`
    ${tw`flex`};
  `};

  img {
    ${tw`rounded-full border-2`}
    border-color: ${(props) => props.theme.colors.accent};
    width: 35px;
    height: 35px;

    ${breakpoint('desktop')`
      width: 45px;
      height: 45px;
    `};
  }

   div {
    ${tw`flex flex-col py ml-4`}

    a:first-child {
      ${tw`font-semibold text-sm`}

      ${breakpoint('desktop')`
        ${tw`text-base`};
      `};

    }

    a:last-child {
      ${tw`text-xs`}
      color: ${(props) => props.theme.colors.text};
      transition: color ease-in-out 300ms;

      ${breakpoint('desktop')`
        ${tw`text-sm`};
      `};

    &:hover {
      color: ${(props) => darken(0.2, `${props.theme.colors.text}`)};
    }
    }
  }
`;
