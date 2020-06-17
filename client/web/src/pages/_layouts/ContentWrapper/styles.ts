import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Container = styled.main`
  ${tw`h-screen flex flex-1  `}
  background-color: ${(props) => props.theme.colors.shade};
  border-top-left-radius: 2.7rem;
  border-bottom-left-radius: 2.7rem;
  border-top: 10px solid ${(props) => props.theme.colors.base};
  border-bottom: 10px solid ${(props) => props.theme.colors.base};
`;

export const ColLeft = styled.div`
  ${tw`h-screen flex flex-col w-1/2 py-6 px-10`}
  border-top-left-radius: 2.7rem;
  border-bottom-left-radius: 2.7rem;
  background-color: ${(props) => props.theme.colors.shade};
  height: calc(100vh - 20px);
`;

export const ColRight = styled.div`
  ${tw`h-screen flex flex-col w-1/2`}
  background-color: ${(props) => props.theme.colors.formPanel};
  border-top-left-radius: 2.7rem;
  border-bottom-left-radius: 2.7rem;
  height: calc(100vh - 20px);
`;

export const Header = styled.header`
  ${tw`flex w-full items-center mb-8`};

  h1 {
    ${tw`text-xl font-semibold capitalize  mr-auto `}
  }
`;
