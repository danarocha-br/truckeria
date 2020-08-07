import React, { useContext } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { ThemeContext } from 'styled-components';

import colors from '../../styles/tokens/colors';
import { Wrapper, Error } from './styles';

const animatedComponents = makeAnimated();

const SelectInput = ({
  label,
  id,
  icon: Icon,
  disabled,
  isLoading,
  isMulti,
  placeholder,
  options,
  ...rest
}) => {
  const theme = useContext(ThemeContext);

  const customStyles = {
    container: (base) => ({
      ...base,
      width: '100%',
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: theme.form.text,
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dashed #CBD4E1',
      color: state.isSelected ? 'red' : colors.gray800,
      backgroundColor: state.isFocused | state.isSelected ? '#ECE7D2' : 'white',
      zIndex: 999,
    }),
    control: (provided, state, base) => ({
      ...provided,
      ...base,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.form.background,
      borderRadius: '.5rem',
      height: 74,
      paddingLeft: 15,
      color: theme.form.text,
      boxShadow: 'none',
      border: state.isFocused
        ? `1px solid ${theme.form.focus}`
        : '1px solid transparent',
      '&:hover': {
        border: `1px solid ${theme.form.focus}`,
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 999,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      opacity: 0.3,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: theme.form.text,
    }),
    loadingIndicator: (base) => ({
      ...base,
      color: theme.form.text,
    }),
    multiValue: (provided, state, base) => ({
      ...provided,
      ...base,
      opacity: state.isDisabled ? 0.5 : 1,
      transition: 'opacity 300ms',
      backgroundColor: theme.colors.base,
      border: `1px solid ${theme.form.focus}`,
      borderRadius: 5,
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: theme.form.text,
    }),
    clearIndicator: (base) => ({
      ...base,
      color: theme.form.focus,
      '&:hover': {
        color: theme.form.text,
      },
    }),
  };

  /**
   * Formik
   */
  const [, meta] = useField(rest);

  return (
    <Wrapper className="c-input">
      <Select
        closeMenuOnSelect={false}
        styles={customStyles}
        components={animatedComponents}
        isMulti={isMulti}
        options={options}
        isLoading={isLoading}
        placeholder={placeholder}
        id={id}
        {...rest}
      />

      {meta.touched && meta.error ? (
        <Error>
          <span>{meta.error}</span>
        </Error>
      ) : null}
    </Wrapper>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
};

SelectInput.defaultProps = {
  isLoading: false,
  isMulti: false,
};

export default SelectInput;
