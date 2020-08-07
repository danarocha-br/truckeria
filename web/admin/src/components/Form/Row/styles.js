import styled from 'styled-components';
import tw from 'tailwind.macro';
import breakpoint from 'styled-components-breakpoint';

export const Container = styled.div`
  ${tw`flex flex-col mt-4`};
  z-index: 0;

  ${breakpoint('tablet')`
    ${tw`flex flex-row items-baseline w-full my-0`};
  `}

  div:first-child {
    ${tw`mr-4`};
  }
`;
