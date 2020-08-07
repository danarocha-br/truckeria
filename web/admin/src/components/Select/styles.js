import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Wrapper = styled.div`
  ${tw`flex flex-col w-full`};
  & + .c-input {
    ${tw`mt-4 w-full`}
  }
`;

export const Error = styled.div`
  ${tw`text-xs text-left pt-1`}
  color: ${(props) => props.theme.colors.error};;
`;
