/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  inputStyle,
  errorStyle,
  inputWrapperStyle,
  labelStyle,
} from '../styles/registerStyles';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  error,
}) => {
  return (
    <div css={inputWrapperStyle}>
      <div css={labelStyle}>{label}</div>
      <input
        css={[inputStyle, error ? errorStyle : {}]}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      {error && <div>{error}</div>}
    </div>
  );
};

export default InputField;
