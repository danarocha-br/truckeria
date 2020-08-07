import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlinePicture } from 'react-icons/ai';
import { useField } from 'formik';

import { Container } from './style';
import colors from '../../styles/tokens/colors';
import Thumb from './Thumb';

const Upload = ({ values, setFieldValue, ...rest }) => {
  /**
   * Formik
   */
  const [field, meta] = useField(rest);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
    onDrop,
  } = useDropzone();

  const handleOnDrop = useCallback((acceptedFiles) => {
    // do nothing if no files
    if (acceptedFiles.length === 0) {
      return;
    }
    // on drop we add to the existing files
    setFieldValue('files', values.files.concat(acceptedFiles));
  }, []);

  return (
    <Container
      {...getRootProps({
        isDragActive,
        isDragAccept,
        isDragReject,
        onDrop,
        acceptedFiles,
      })}
    >
      <input
        {...getInputProps()}
        multiple={false}
        accept="image/*"
        onDrop={handleOnDrop}
        {...field}
        {...rest}
      />

      {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
        if (isDragActive) {
          return 'This file is authorized';
        }

        if (isDragReject) {
          return 'This file is not authorized';
        }

        if (values.files.length === 0) {
          return <p>Try dragging a file here!</p>;
        }

        return values.files.map((file, i) => <Thumb key={i} file={file} />);
      }}

      <p className="flex flex-col items-center c-upload__content">
        <AiOutlinePicture size="48" color={colors.gray200} />
        Drag 'n' drop some files here, or click to select files
      </p>
    </Container>
  );
};

export default Upload;
