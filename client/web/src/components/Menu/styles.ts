import styled from 'styled-components';
import tw from 'tailwind.macro';
import { darken } from 'polished';

export const Container = styled.nav`
  ${tw`h-screen flex flex-col w-1/4 justify-between p-6 relative`}
  background-color: ${(props) => props.theme.colors.base};
  max-width: 270px;
  min-width: 200px;

  .logo {
    ${tw`mt--5`}
    width: 156px;
    text-align: center;
  }

  label:first-child {
    ${tw`absolute right-0 mr-4 mt--2`}
    transform: scale(.7);
  }
`;

export const List = styled.ul``;

export const Profile = styled.div`
  ${tw`flex w-full items-center`}

  img {
    ${tw`rounded-full border-2`}
    border-color: ${(props) => props.theme.colors.accent};
    width: 45px;
    height: 45px;
  }

   div {
    ${tw`flex flex-col py ml-4`}

    a:first-child {
      ${tw`font-semibold`}

    }

    a:last-child {
      ${tw`text-sm`}
      color: ${(props) => props.theme.colors.text};

      transition: color ease-in-out 300ms;

    &:hover {
      color: ${(props) => darken(0.2, `${props.theme.colors.text}`)};
    }
    }
  }
`;
