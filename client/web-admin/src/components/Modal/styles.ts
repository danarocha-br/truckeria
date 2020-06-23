import styled from 'styled-components';
import tw from 'tailwind.macro';
import { motion } from 'framer-motion';
import breakpoint from 'styled-components-breakpoint';

export const Container = styled(motion.section)<{ width: number }>`
  ${tw`z-50 absolute top-0 w-full right-0 py-8 px-5 overflow-scroll`};
  pointer-events: all;
  background-color: ${(props) => props.theme.colors.white};

  margin-top: 11px;
  height: calc(100vh + 50px);

  @media(min-width: 992px) {
    ${tw`pl-8 pr-6`};
    width: ${(props) => `${props.width}%`};
    border-top-left-radius: 2.3rem;
    border-bottom-left-radius: 2.3rem;
    height: calc(100vh - 21px);
  }

  @media(min-width: 1500px) {
    width: ${(props) => `calc(${props.width}% + 26px)`};
  }

`;

export const Title = styled.header`
  ${tw`flex justify-between  text-gray-900`};

  h1 {
    ${tw`text-lg font-semibold capitalize mr-auto mb-12`};
  }

`;
