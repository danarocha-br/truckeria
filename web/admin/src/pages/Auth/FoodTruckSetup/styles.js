import styled from 'styled-components';
import tw from 'tailwind.macro';
import breakpoint from 'styled-components-breakpoint';

export const AnimatedContainer = styled.div`
  ${tw`flex flex-1 flex-col items-center h-screen p-5`};
  width: 100%;

  ${breakpoint('tablet')`
    ${tw`absolute p-10`};
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
  background-color: ${(props) => props.theme.colors.shade};

  ${breakpoint('tablet')`
    ${tw`flex flex-col h-screen p-10 fixed`};
    width: 500px;
  `}
`;
