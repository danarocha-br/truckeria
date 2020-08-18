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
  ${tw`flex flex-1 flex-col w-full h-screen pt-5`};
  animation: ${animateFromLeft} 1s;
  overflow: scroll;

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
    ${tw`text-center mb-5`};
    color: ${(props) => props.theme.colors.text};

    ${breakpoint('tablet')`
    ${tw`text-right mr-10`};
  `}
  }
`;

export const Content = styled.div`
  ${tw`flex flex-1 flex-col items-center text-center w-full`};
  place-content: center;

  h1 {
    ${tw`mt-5`};
  }

  .disclaimer {
    ${tw`mb-8`};
  }

  .logo {
    width: 216px !important;
    height: 104px !important;
    margin-bottom: 0px !important;
  }
`;

export const Background = styled.div`
  ${breakpoint('desktop')`
    flex: 1;
    background-size: cover;
    background: url(${SignInBck}) no-repeat center right;
    height: 100vh;
    overflow: hidden;
  `}
`;
