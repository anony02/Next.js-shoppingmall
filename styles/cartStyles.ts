import { css } from '@emotion/react';

export const cartStyle = css`
  padding: 80px 50px;
  background-clip: content-box;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-size: 16px;
`;

export const tohomeStyle = css`
  text-decoration: none;
  color: white;
  background-color: black;
  border: 2px solid rgba(200, 200, 200, 0.5);
  text-align: center;
  margin-top: 100px;
  padding: 20px;
  font-weight: bold;
  width: 200px;
`;

export const totalStyle = css`
  font-weight: bold;
  width: 660px;
  text-align: end;
  padding: 10px;
`;

export const buyStyle = css`
  font-weight: bold;
  color: white;
  background-color: black;
  padding: 10px;
  width: 200px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
