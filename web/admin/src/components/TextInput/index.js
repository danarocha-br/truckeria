import React, { useCallback, useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { ThemeContext } from 'styled-components';
import { AiFillExclamationCircle } from 'react-icons/ai';

import { Container, Wrapper, Error } from './styles';
import Spinner from '../Spinner';

const TextInput = ({ label, id, icon: Icon, disabled, isLoading, ...rest }) => {
  /**
   * Formik
   */
  const [field, meta] = useField(rest);

  /**
   * Get UI States
   */
  const inputRef = useRef(null);
  const [isFocused, setFocus] = useState(false);
  const [hasValue, setValue] = useState(false);
  const { colors } = useContext(ThemeContext);

  const handleInputFocus = useCallback(() => {
    setFocus(true);
  }, [setFocus]);

  const handleInputBlur = useCallback(() => {
    setValue(!!inputRef.current.value);

    setFocus(false);
  }, [setFocus, setValue]);

  return (
    <Wrapper className="c-input">
      <Container
        isFocused={isFocused}
        onBlur={handleInputBlur}
        hasValue={hasValue && inputRef.current.value}
        disabled={disabled}
        hasError={meta.touched && meta.error}
        isLoading={isLoading}
      >
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          id={id}
          disabled={disabled || isLoading}
          // onValueChange={(value) => setFieldValue('numbers', value.floatValue)}
          {...field}
          {...rest}
        />

        <label htmlFor={id}>
          {Icon && <Icon />}
          <span>{label}</span>
          {meta.touched && meta.error ? (
            <AiFillExclamationCircle size={20} color={colors.error} />
          ) : null}
          {isLoading ? (
            <i className="spinner">
              <Spinner small />
            </i>
          ) : null}
        </label>
      </Container>
      {meta.touched && meta.error ? (
        <Error>
          <span>{meta.error}</span>
        </Error>
      ) : null}
    </Wrapper>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  icon: PropTypes.func,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
};

TextInput.defaultProps = {
  type: 'text',
  disabled: false,
  readOnly: false,
  isLoading: false,
};

export default TextInput;
