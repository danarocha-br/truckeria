import styled from 'styled-components';
import tw from 'tailwind.macro';
import breakpoint from 'styled-components-breakpoint';

export const Container = styled.main`
  ${tw`flex`};
  height: calc(100vh - 65px);

  ${breakpoint('tablet')`
    ${tw`flex-1 h-screen`};
    border-top-left-radius: 2.7rem;
    border-bottom-left-radius: 2.7rem;
    border-top: 10px solid;
    border-bottom: 10px solid;
  `}

  background-color: ${(props) => props.theme.colors.shade};
  border-top-color: ${(props) => props.theme.colors.base} !important;
  border-bottom-color: ${(props) => props.theme.colors.base} !important;


`;

export const ColLeft = styled.div`
  ${tw`flex flex-col w-screen py-6 px-10 overflow-scroll`};
  background-color: ${(props) => props.theme.colors.shade};

  ${breakpoint('tablet')`
    ${tw`h-screen flex flex-col w-1/2`};
    border-top-left-radius: 2.7rem;
    border-bottom-left-radius: 2.7rem;
    height: calc(100vh - 20px);
  `}
`;

export const ColRight = styled.div`
  ${tw`hidden`};
  background-color: ${(props) => props.theme.colors.formPanel};

  ${breakpoint('tablet')`
    ${tw`h-screen flex flex-col w-1/2`};
    border-top-left-radius: 2.7rem;
    border-bottom-left-radius: 2.7rem;
    height: calc(100vh - 20px);
  `}
`;

export const Header = styled.header`
  ${tw`flex w-full items-center mb-8`};

  h1 {
    ${tw`text-xl font-semibold capitalize  mr-auto `}
  }
`;
