import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Item = styled.li`
  ${tw`pb-8`}
  a {
    ${tw`flex items-center capitalize font-semibold relative w-full`};
    color: ${(props) => props.theme.colors.text};
    opacity: 0.6;

    &:after {
      ${tw`rounded absolute`}
      content: '';
      border: ${(props) => `1px solid ${props.theme.colors.primary}`};
      bottom: -5px;
      left: 40px;
      width: 0px;
      opacity: 0;
      transition: all 400ms ease;
    }

    &:hover::after {
      width: 40px;
      opacity: 1;
    }

    &:hover {
      opacity: 1;
      color: ${(props) => props.theme.colors.text};
    }

    &:hover svg {
      color: ${(props) => props.theme.colors.primary};
    }

    svg {
      ${tw`mr-4`}
    }
  }
`;
