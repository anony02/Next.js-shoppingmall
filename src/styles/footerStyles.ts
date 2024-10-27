import { css } from '@emotion/react';

export const footer = css`
  display: flex;
  padding: 0 20px;
  background-color: rgba(240, 240, 240);
  justify-content: center;
  align-items: center;
`;

export const container = css`
  height: 200px;
  width: 300px;
  font-size: 12px;
  padding: 50px;

  & > div {
    width: 200px;
  }
`;

export const title = css`
  font-weight: bold;
  font-size: 14px;
`;

export const cs = css`
  font-size: 24px;
  font-weight: bold;
`;

export const btnwrap = css`
  display: flex;
  align-items: flex-end;
`;

export const btn = css`
  height: 30px;
  margin: 5px;
  border-radius: 8px;

  &:hover {
    opacity: 0.5;
  }
`;
