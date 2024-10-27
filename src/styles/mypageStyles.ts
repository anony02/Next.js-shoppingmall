import { css } from '@emotion/react';

export const titleStyle = css`
  font-size: 1.25rem;
  width: 420px;
  text-align: left;
  margin-bottom: 2rem;
`;

export const linkStyle = css`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #fff;
  border: none;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  width: 420px;
  height: 60px;
  text-align: left;
  font-weight: bold;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #eee;
    border: none;
    border-bottom: 1px solid #eee;
    opacity: 0.7;
  }
`;
