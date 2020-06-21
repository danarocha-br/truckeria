import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import tw from 'tailwind.macro';

import SignInBck from '../../assets/sign-in-background.png';

export const Container = styled.div`
  ${tw`h-full w-full flex items-stretch `}
  background-color: ${(props) => props.theme.colors.base};

  ${breakpoint('tablet')`
    ${tw`h-screen`};
  `}

  .logo {
    ${tw`mb-12`};
    width: 150px;

    ${breakpoint('tablet')`
      width: 216px;
  `}
  }
`;

export const Content = styled.div`
  ${tw`flex flex-1 flex-col items-center text-center w-full h-full`}
  place-content: center;
`;

export const Background = styled.div`
  ${breakpoint('desktop')`
    flex: 1;
    background-position: cover;
    background: url(${SignInBck}) no-repeat center right;
    height: 100%;
    overflow: hidden;
  `}
`;

const animateFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimatedContainer = styled.div`
  ${tw`flex flex-1 flex-col w-full h-screen`}
  place-content: center;
  animation: ${animateFromLeft} 1s;

  h1 {
    ${tw`mb-4 text-2xl font-bold`}
    color: ${(props) => props.theme.colors.text};
  }

  form {
    ${tw`my-8 px-4 w-full`}


    ${breakpoint('tablet')`
     width: 450px;
  `}

    a {
      ${tw`mt-8`}
    }
  }

  span:first-child {
    ${tw`text-right mr-10 mt-8`}
    color: ${(props) => props.theme.colors.text};
  }
`;
