import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import tw from 'tailwind.macro';

export const Wrapper = styled.div`
  ${tw`h-full w-full flex items-stretch`};
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
