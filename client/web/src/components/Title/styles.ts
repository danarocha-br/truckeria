import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Container = styled.div`
  ${tw`flex w-full items-center`};

  h2 {
    ${tw`mr-auto w-32 font-medium`};
  }

  hr {
    ${tw`flex-1 ml-4 border-dashed opacity-25`};
    border-color: ${(props) => props.theme.colors.accent};
  }
`;
