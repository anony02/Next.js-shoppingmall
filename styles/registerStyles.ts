import { css } from '@emotion/react';

export const formStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
  align-items: center;
  padding: 4rem;
`;

export const inputWrapperStyle = css`
  position: relative;
  margin-bottom: 2rem;
`;

export const labelStyle = css`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const inputStyle = css`
  width: 420px;
  height: 50px;
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

export const buttonStyle = css`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  width: 180px;
  height: 50px;
  margin-bottom: 1rem;

  &:hover {
    opacity: 0.7;
    border: none;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    &:hover {
      opacity: 1;
    }
  }
`;

export const errorStyle = css`
  border-color: red !important;
  & + div {
    color: red;
    font-size: 0.75rem;
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 100%;
  }
  &:focus {
    border-color: red !important;
  }
`;

export const LogoStyle = css`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;
