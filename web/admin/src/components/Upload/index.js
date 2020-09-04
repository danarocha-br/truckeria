import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlinePicture } from 'react-icons/ai';
import { useFirebase } from 'react-redux-firebase';

import { Container, Thumb, InfoRejected } from './style';
import colors from '../../styles/tokens/colors';

const Upload = ({ values, setFieldValue, valueField, ...rest }) => {
  // const firebase = useFirebase();

  const onDrop = useCallback(
    (acceptedFiles) => {
      // do nothing if no files
      if (acceptedFiles.length === 0) {
        return;
      }
      setFieldValue(valueField, acceptedFiles);
    },
    [setFieldValue, valueField]
  );

  // const onFileDelete = useCallback((file, key) => {
  //   return firebase.deleteFile(file.fullPath, `${filesPath}/${key}`);
  // });

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    isDragAccept,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*',
  });

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
      <input {...getInputProps()} {...rest} onDrop={onDrop} />

      {values.files && values.files.length > 0 ? (
        <Thumb
          src={URL.createObjectURL(values.files[0])}
          alt={values.files[0].name}
        />
      ) : (
        <>
          <p className="flex flex-col items-center c-upload__content">
            <AiOutlinePicture size="48" color={colors.gray200} />
            Drag 'n' drop some files here, or click to select files
          </p>
        </>
      )}

      {isDragReject && (
        <InfoRejected>This file is not authorized.</InfoRejected>
      )}

      {/* <button onClick={() => onFileDelete(values.files, values.key)}>
        Delete File
      </button> */}
    </Container>
  );
};

export default Upload;
