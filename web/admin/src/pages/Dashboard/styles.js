import styled from 'styled-components';
import tw from 'tailwind.macro';
import breakpoint from 'styled-components-breakpoint';

export const Grid = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 100%);
  gap: 25px;

  ${breakpoint('tablet')`
    grid-template-columns: repeat(3, 300px);
  `}
  ${breakpoint('desktop')`
  grid-template-columns: repeat(4, 300px);
  `}
`;

export const Container = styled.div`
  ${tw`flex flex-col w-screen py-10 px-10 overflow-scroll`};
`;
