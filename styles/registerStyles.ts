import { css } from '@emotion/react';

export const formStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
`;

export const inputStyle = css`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

export const buttonStyle = css`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;
