import styled from 'styled-components';
import tw from 'tailwind.macro';
import { motion } from 'framer-motion';

export const Container = styled(motion.section)<{ width: number }>`
  ${tw`z-50 h-screen absolute top-0 right-0`};
  pointer-events: all;
  background-color: ${(props) => props.theme.colors.white};
  width: ${(props) => `${props.width}%`};
  border-top-left-radius: 2.3rem;
  /* display: none; */
`;
