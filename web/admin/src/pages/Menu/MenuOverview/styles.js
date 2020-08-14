import styled from 'styled-components';
import tw from 'tailwind.macro';
import breakpoint from 'styled-components-breakpoint';
import { motion } from 'framer-motion';

import Image from '../../../assets/sign-in-background.png';

export const Container = styled.div`
  ${tw`flex flex-col py-8 px-8`};

  h1 {
    ${tw`text-lg font-semibold capitalize mr-auto text-gray-900 mb-8`};
  }
`;

export const Thumb = styled.div`
  ${tw`rounded-lg bg-cover w-full mb-5`}
  height: 250px;
  background: url(${Image}) no-repeat;
  background-position: center center;
  background-size: 100%;
  transition: all 0.8s;

  &:hover {
    background-size: 120%;
  }
`;

export const List = styled(motion.ul)`
  ${tw`mt-8`};
  display: grid;
  grid-gap: 1rem !important;
  gap: 1rem !important;
  grid-auto-flow: row !important;
  grid-template-rows: repeat(1, minmax(0, 1fr)) !important;

  ${breakpoint('desktop')`
  grid-auto-flow: column !important;
  grid-template-rows: repeat(2, minmax(0, 1fr)) !important;
  `}
`;
