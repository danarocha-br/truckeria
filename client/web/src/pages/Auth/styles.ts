import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import tw from 'tailwind.macro';
import { shade } from 'polished';

import SignInBck from '../../assets/sign-in-background.png';

export const Container = styled.div`
  ${tw`h-screen flex items-stretch `}
`;

export const Content = styled.div`
  ${tw`flex flex-1 flex-col items-center text-center`}
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
  ${tw`flex flex-1 flex-col items-center`}
  place-content: center;
  animation: ${animateFromLeft} 1s;

  h1 {
    ${tw`mb-6 text-2xl`}
  }

  form {
    ${tw`my-10`}
    width: 450px;

    a {
      ${tw`text-white block no-underline`}
      transition: color 0.3s;

      &:hover {
        background: ${shade(0.1, '#fff')};
      }
    }
  }
`;