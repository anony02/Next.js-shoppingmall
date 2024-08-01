import { css } from '@emotion/react';

export const paginationStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  button {
    margin: 0 0.25rem;
    width: 2rem;
    height: 2rem;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;

    &:hover:not(:disabled) {
      background-color: rgb(240, 240, 240);
    }

    &:disabled {
      cursor: not-allowed;
      background-color: #ccc;
      border-color: #ccc;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
  }
`;
