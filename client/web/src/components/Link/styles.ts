import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

export type Props = LinkProps;

export const Container = styled(Link)<Props>`
  position: relative;
  text-decoration: none;
  display: inline-block;
  color: ${(props) => props.theme.colors.primary};
  padding: 0 1px;
  transition: color ease 0.3s;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 5%;
    left: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.colors.primary};
    transition: all ease 0.3s;
  }

  &:hover {
    color: white;

    &::after {
      height: 100%;
    }
  }
`;
