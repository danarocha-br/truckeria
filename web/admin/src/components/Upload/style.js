import styled from 'styled-components';
import tw from 'tailwind.macro';
import { opacify } from 'polished';
import Dropzone from 'react-dropzone';

const getColor = (props) => {
  if (props.isDragAccept) {
    return (props) => props.theme.form.success;
  }
  if (props.isDragReject) {
    return (props) => props.theme.colors.error;
  }
  if (props.isDragActive) {
    return (props) => props.theme.form.focus;
  }
  return (props) => opacify('0.3', props.theme.colors.tabbar);
};

export const Container = styled.section`
  ${tw`flex flex-1 flex-col items-center rounded-lg cursor-pointer mb-5`};
  padding: 40px;
  border-width: 1px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: ${(props) => props.theme.colors.shade};
  color: ${(props) => props.theme.form.text};
  outline: none;
  transition: border 0.24s ease-in-out;

  .c-upload__content {
    svg {
      ${tw`mb-5`}
    }
  }
`;
