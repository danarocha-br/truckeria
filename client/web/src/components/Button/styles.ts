import styled from 'styled-components';
import tw from 'tailwind.macro';
import { shade } from 'polished';

export const Container = styled.button`
  ${tw`text-white font-bold rounded-lg w-full p-5 my-4`};
  background-color: ${(props) => props.theme.button.success};
  transition: background-color 0.3s;

  &:hover {
    background: ${(props) => shade(0.15, props.theme.button.success)};
  }
`;
