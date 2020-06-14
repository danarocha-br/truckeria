import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Container = styled.aside`
  ${tw`h-screen flex flex-col w-1/4 justify-between p-8`}
  background-color: ${(props) => props.theme.colors.base};
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

    a:last-child {
      ${tw`text-sm`}
    }
  }
`;
