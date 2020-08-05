import styled from 'styled-components';
import tw from 'tailwind.macro';

import colors from '../../styles/tokens/colors';

export const Container = styled.span`
  ${tw`flex justify-center text-sm font-medium border border-solid rounded px-5 py-1`};
  color: ${colors.gray800};
  border-color: ${(props) => props.theme.colors.primary};
`;
