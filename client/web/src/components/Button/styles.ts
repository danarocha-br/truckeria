import styled from 'styled-components';
import tw from 'tailwind.macro';
import { shade } from 'polished';

export const Container = styled.button`
  ${tw`text-white font-bold bg-orange-500 rounded-lg w-full p-5 mb-4`}
  transition: background-color 0.3s;

  &:hover {
    background: ${shade(0.1, '#ED8936')};
  }
`;
