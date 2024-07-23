import { css } from '@emotion/react';

export const card = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 350px;
  padding: 10px;
`;

export const linkwrap = css`
  text-decoration: none;
  color: black;
  font-size: 10px;
  overflow: hidden;
  &:hover {
    background-color: rgba(200, 200, 200, 0.5);
  }
`;

export const imgStyle = css`
  width: 230px;
  height: 230px;
  padding: 20px;
  object-fit: contain;
  transform: scale(1);
  transition-duration: 0.3s;
  &:hover {
    transform: scale(1.1);
    transition-duration: 0.3s;
  }
`;

export const info = css`
  width: 230px;
  height: 100px;
  padding: 10px;
`;

export const titleStyle = css`
  font-weight: bold;
  font-size: 14px;
`;

export const discount = css`
  color: red;
  font-weight: bold;
  font-size: 12px;
  margin-right: 4px;
`;

export const priceStyle = css`
  font-weight: bold;
  font-size: 14px;
`;

export const soldout = css`
  color: red;
  font-weight: bold;
  margin-left: 5px;
`;
