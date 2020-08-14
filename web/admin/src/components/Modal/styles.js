import styled from 'styled-components';
import { motion } from 'framer-motion';
import tw from 'tailwind.macro';

import colors from '../../styles/tokens/colors';

export const Container = styled(motion.div)`
  ${tw`h-full absolute right-0`};
  border-top-left-radius: 2.7rem;
  border-bottom-left-radius: 2.7rem;
  background: white;
  z-index: 100;

  .close-label {
    width: 0;
    overflow: hidden;
    font-size: 16px;
    font-weight: 600;
    color: ${colors.gray900};
    position: absolute;
    line-height: 28px;
    top: 43px;
    right: 45px;
    transition: 0.3s;
  }

  .close-icon:hover + .close-label {
    width: 40px;
    transition: 0.1s;
    transition-delay: 0.25s;
  }

  .close-icon {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 20px;
    top: 43px;
    z-index: 2;
    cursor: pointer;

    &:hover {
      .bar {
        &:first-child {
          transform: translate(-50%, -50%) rotate(65deg);
          transition: 0.2s ease-in-out;
        }

        &:last-child {
          transform: translate(-50%, -50%) rotate(-115deg);
          transition: 0.2s ease-in-out;
        }
      }
    }

    .bar {
      width: 70%;
      height: 2px;
      background-color: ${colors.gray900};
      position: absolute;
      top: 50%;
      left: 50%;
      transition: 0.2s ease-in-out;
      transition-delay: 0.15s;

      &:first-child {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:last-child {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }
`;
