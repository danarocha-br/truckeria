import styled from 'styled-components';
import tw from 'tailwind.macro';
import breakpoint from 'styled-components-breakpoint';

import colors from '../../../styles/tokens/colors';

export const AnimatedContainer = styled.div`
  ${tw`flex flex-1 flex-col items-center h-full p-5`};
  width: 100%;

  ${breakpoint('tablet')`
    ${tw`absolute p-10 h-full`};
    width: calc(100% - 500px);
  `}

  > div {
    color: ${(props) => props.theme.colors.text};

    ${breakpoint('desktop')`
    width: 600px;
  `}
  }

  h1,
  p {
    ${tw`text-center`};
  }

  h1 {
    ${tw`mb-4 text-2xl font-bold`};
  }

  p {
    opacity: 0.7;
  }

  h2 {
    ${tw`my-12 text-lg relative`};

    &::after {
      ${tw`absolute left-0 w-full opacity-25`};
      content: '';
      bottom: -8px;
      border-bottom: ${(props) => `1px dashed ${props.theme.colors.text}`};
    }
  }
`;

export const PreviewContainer = styled.div`
  ${tw`hidden right-0`};
  background-color: ${colors.gray100};

  ${breakpoint('tablet')`
    ${tw`flex flex-col h-screen p-5 fixed`};
    width: 500px;
  `}

  h3 {
    ${tw`text-lg text-gray-900 font-bold py-4`};
  }

  canvas {
    ${tw`rounded-lg`};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .address {
    ${tw`flex items-center text-gray-900 bg-white py-5 px-4 rounded-lg mt-5`};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    span {
      ${tw`ml-5`};
    }
  }
`;

export const ProfileImg = styled.div`
  ${tw`bg-cover bg-center w-full rounded-lg`};
  height: 200px;
  background: ${(props) => `url(${props.src}) no-repeat`};
  background-position: center center;
  background-size: 100%;
  transition: all 0.8s;

  &:hover {
    background-size: 120%;
  }
`;
