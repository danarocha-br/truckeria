import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Container = styled.div`
  ${tw`flex w-full items-center mb-6`};

  h2 {
    ${tw`mr-auto w-32 font-medium`};
    color: ${(props) => props.theme.colors.accent};
  }

  hr {
    ${tw`flex-1 ml-4 border-dashed`};
    border-color: ${(props) => props.theme.colors.accent};
  }
`;
