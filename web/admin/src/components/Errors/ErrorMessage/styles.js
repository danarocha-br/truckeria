import styled from 'styled-components';
import tw from 'tailwind.macro';
import { lighten } from 'polished';

export const Container = styled.div`
  ${tw`w-full flex items-center p-4 rounded-lg`};
  background-color: ${(props) => lighten(0.25, props.theme.colors.error)};
  border: ${(props) => `1px solid ${props.theme.colors.error}`};

  svg {
    ${tw`mr-4`};
  }
`;
