import styled from 'styled-components';
import tw from 'tailwind.macro';
import { opacify, transparentize } from 'polished';

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

export const InfoRejected = styled.p`
  ${tw`w-full py-3 rounded-lg mt-4`};
  background-color: ${(props) =>
    transparentize('.7', props.theme.colors.error)};
`;

export const Thumb = styled.div`
  ${tw`bg-cover bg-center w-full rounded-lg`};
  height: 150px;
  background: ${(props) => `url(${props.src}) no-repeat`};
  background-position: center center;
  background-size: 100%;
  transition: all 0.8s;

  &:hover {
    background-size: 120%;
  }
`;
