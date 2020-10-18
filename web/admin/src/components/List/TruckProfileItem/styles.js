import styled from 'styled-components';
import tw from 'tailwind.macro';
import { transparentize } from 'polished';

export const Container = styled.div`
  ${tw`flex flex-col bg-white p-2`};
  border-radius: 1.2rem;
  transition: all .3s;

  &:hover {
    ${tw`cursor-pointer`};
    background-color: ${transparentize(.1, '#fff')};
    transform: scale(1.01);
  }

  span {
    ${tw`flex w-full text-gray-500 px-2`};

    p {
      ${tw`pr-2 capitalize`};

      &::after {
        content: ','
      }

      &:last-child {
          &::after {
          content: ''
        }
      }
    }
  }

  address {
    ${tw`not-italic`};
  }
`;

export const ProfileImg = styled.div`
  ${tw`bg-cover w-full mb-3`};
  border-radius: 1rem;
  height: 150px;
  background: ${(props) => `url(${props.src}) no-repeat`};
  background-position: center center;
  background-size: 120%;
  transition: all 0.8s;
`;

export const Footer = styled.footer`
  ${tw`flex w-full text-sm py-2`};

  span {
    ${tw`text-gray-500 flex-1`};
  }

  address {
    ${tw`text-white bg-gray-800 py-1 px-2 rounded-sm text-xs`};

    svg {
      display: inline;
    }
  }
`
