import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Container = styled.div`
  ${tw`w-full flex items-center text-left p-4 rounded-lg mt-4 text-sm`};
  color: ${(props) => props.theme.colors.text};
  background-color: #ff7b7b1f;
  border: ${(props) => `1px solid ${props.theme.colors.error}`};

  svg {
    ${tw`mr-4`};
  }
`;
