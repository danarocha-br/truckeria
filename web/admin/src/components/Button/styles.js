import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import tw from 'tailwind.macro';
import { shade, desaturate } from 'polished';

function renderHover(props) {
  if (props.Icon) {
    return props.theme.colors.shade;
  }

  if (props.secondary) {
    return props.theme.colors.accent;
  }

  return shade(0.15, props.theme.button.success);
}

export const Container = styled(motion.button)`
  ${tw`flex items-center justify-center text-center font-bold capitalize rounded-lg my-4 relative cursor-pointer`};
  color: ${(props) =>
    props.secondary ? props.theme.colors.accent : props.theme.colors.white};
  background-color: ${(props) =>
    props.Icon || props.secondary ? 'transparent' : props.theme.button.success};
  transition: background-color 0.3s;
  width: ${(props) => (props.Icon ? '40px' : '100%')};
  padding: ${(props) => (props.Icon ? '12px' : '20px')};
  border: ${(props) =>
    props.secondary
      ? `1px solid ${props.theme.colors.accent}`
      : '1px solid transparent'};

  ${(props) =>
    !props.Icon &&
    css`
      svg {
        ${tw`absolute`};
        right: 16px;
      }
    `}

  &:hover {
    color: white;
    background: ${(props) => renderHover(props)};
    border: 1px solid transparent;
  }

  &:focus {
    border: ${(props) =>
      props.Icon
        ? `1px dashed ${props.theme.colors.primary}`
        : `1px solid ${props.theme.colors.text}`};
  }

  ${(props) =>
    props.isLoading &&
    css`
      background-color: ${desaturate(0.7, props.theme.colors.primary)};
    `}

  ${(props) =>
    props.isLoading &&
    props.Icon &&
    css`
      opacity: 0.5;
    `}

  &:disabled {
    ${tw`cursor-not-allowed`}
    background-color: ${(props) => desaturate(0.7, props.theme.colors.primary)};

    ${(props) =>
      props.Icon &&
      css`
        opacity: 0.5;
      `}
  }
`;

export const IconContainer = styled.div`
  ${tw`relative cursor-pointer`};

  svg:first-child {
    transition: all ease-in-out 0.5s;
  }

  &:hover,
  &:focus {
    svg:first-child {
      opacity: 0.9;
    }
  }

  ${(props) =>
    props.isLoading &&
    css`
      opacity: 0.5;
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  svg:last-child {
    ${tw`absolute`};
    top: 13px;
    left: 13px;
    transition: opacity 0.5s;
  }
`;
