import React, {
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
  useContext,
} from 'react';
import { useField } from 'formik';
import { ThemeContext } from 'styled-components';
import { AiFillExclamationCircle } from 'react-icons/ai';

import { Container, Error } from './styles';
import Spinner from '../Spinner';

interface FormikActions<Values> {
  setFieldValue<Field extends keyof Values>(
    field: Field,
    value: Values[Field],
    shouldValidate?: boolean,
  ): void;
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<{ size?: string; color?: string }>;
  label: string;
  placeholder?: string;
  loading?: boolean;
  // setFieldValue(field: string, value: any): void;
}

const TextInput: React.SFC<TextInputProps> = ({
  label,
  id,
  icon: Icon,
  disabled,
  loading,
  // setFieldValue,
  ...rest
}) => {
  /**
   * Formik
   */
  const [field, meta] = useField(rest);

  /**
   * Get UI States
   */
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setFocus] = useState(false);
  const [hasValue, setValue] = useState(false);
  const { colors } = useContext(ThemeContext);

  const handleInputFocus = useCallback(() => {
    setFocus(true);
  }, [setFocus]);

  const handleInputBlur = useCallback(() => {
    setValue(!!inputRef.current?.value);

    setFocus(false);
  }, [setFocus, setValue]);

  return (
    <>
      <Container
        isFocused={isFocused}
        onBlur={handleInputBlur}
        hasValue={inputRef.current?.value}
        disabled={disabled}
        hasError={meta.touched && meta.error}
        loading={Number(loading)}
      >
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          id={id}
          disabled={disabled || loading}
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
          {loading ? (
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
    </>
  );
};

TextInput.defaultProps = {
  type: 'text',
  disabled: false,
  readOnly: false,
  loading: false,
};

export default TextInput;
