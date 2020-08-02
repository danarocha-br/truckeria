import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import tw from 'tailwind.macro';

export const Wrapper = styled.div`
  ${tw`h-full flex items-stretch`};
  width: 100% !important;
  color: ${(props) => props.theme.colors.text};
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
