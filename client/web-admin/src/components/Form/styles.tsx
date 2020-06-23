import styled from 'styled-components';
import { Form } from 'formik';
import tw from "tailwind.macro";
import breakpoint from 'styled-components-breakpoint';

export const Container = styled(Form)`
  ${tw`flex flex-col w-full`};

  button {
    ${breakpoint('tablet')`
      ${tw`absolute bottom-0`}
  `}
  }
`;
