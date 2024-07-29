import { css } from '@emotion/react';

export const loadingStyle = css`
  padding: 50px;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left: 4px solid #333;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-left: 10px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const errorStyle = css`
  padding: 50px;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
