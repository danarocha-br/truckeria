import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Item = styled.li`
  ${tw`pb-8`}
  a {
    ${tw`flex items-center capitalize font-semibold`}

    &:active {
      ${tw`font-bold`}
    }

    svg {
      ${tw`mr-4`}
    }
  }
`;
