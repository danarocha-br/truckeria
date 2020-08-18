import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';

export const Container = styled(motion.li)`
  ${tw`flex w-full rounded-md items-center py-2 px-4 font-bold mb-4`};
  height: 100px;
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.shade};
  background-color: ${(props) =>
    transparentize(0.3, props.theme.colors.tabbar)};
  transition: all 0.3s;

  div {
    ${tw`mr-4`};

    &:last-child {
      ${tw`w-full`};
      span {
        width: 100% !important;
      }
    }
  }
`;
