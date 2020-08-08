import styled from 'styled-components';
import tw from 'tailwind.macro';

import colors from '../../../styles/tokens/colors';

export const Container = styled.li`
  ${tw`flex flex-col items-center w-full rounded-lg p-2`};
  background-color: ${colors.gray100};
  transition: background-color 0.5s;
  height: 147px;

  .c-overview__icon {
    ${tw`flex items-center w-full rounded-lg pl-4 mb-4`};
    background-color: ${(props) => props.theme.colors.primary};
    height: 30px;
  }

  h2 {
    ${tw`text-3xl font-bold`};
    color: ${colors.gray800};
  }

  small {
    ${tw`text-base mb-4`};
    color: ${colors.gray800};
  }

  &:hover {
    background-color: ${colors.gray200};
  }
`;
