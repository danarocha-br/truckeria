import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import tw from 'tailwind.macro';

import SignInBck from '../../assets/sign-in-background.png';

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
    ${tw`mb-4 text-2xl font-bold`};
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

  .link {
    ${tw`text-center mt-8`};
    color: ${(props) => props.theme.colors.text};

    ${breakpoint('tablet')`
    ${tw`text-right mr-10`};
  `}
  }
`;

export const Content = styled.div`
  ${tw`flex flex-1 flex-col items-center text-center w-full h-full`}
  place-content: center;

  .disclaimer {
    ${tw`mb-8`};
  }
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
