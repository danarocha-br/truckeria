import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Container = styled.main`
  ${tw`h-screen flex flex-1 rounded-l-lg`}
  background-color: ${(props) => props.theme.colors.shade}
`;

export const ColLeft = styled.div`
  ${tw`h-screen flex flex-col w-1/2`}
`;

export const ColRight = styled.div`
  ${tw`h-screen flex flex-col w-1/2 rounded-l-lg`}
  background-color: white;
`;
