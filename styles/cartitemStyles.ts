import { css } from '@emotion/react';

export const cartitem = css`
  background-clip: content-box;
  display: flex;
  padding: 10px;
  border-top: 2px solid rgb(220, 220, 220);
  border-bottom: 2px solid rgb(220, 220, 220);
  font-size: 12px;
  margin-bottom: 5px;
`;

export const img = css`
  width: 200px;
  height: 200px;
  object-fit: contain;
  border: 1px solid rgb(230, 230, 230);
`;

export const info = css`
  width: 200px;
  height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  & > * {
    padding: 10px 0;
    text-align: start;
  }
  & > button {
    margin-top: 10px;
  }
`;

export const title = css`
  font-weight: bold;
  font-size: 14px;
`;

export const discount = css`
  color: red;
  font-weight: bold;
  margin-right: 8px;
`;

export const price = css`
  font-weight: bold;
  font-size: 14px;
`;

export const soldout = css`
  color: red;
  font-weight: bold;
  margin-left: 5px;
`;

export const btnwrap = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;

export const deleteStyle = css`
  line-height: 30px;
  width: 30px;
  height: 30px;
`;

export const select = css`
  display: flex;
  line-height: 30px;
  align-items: end;
  & > div {
    width: 120px;
    text-align: end;
    font-weight: bold;
  }
`;

export const selectbox = css`
  width: 120px;
  height: 30px;
  display: flex;
  align-content: center;
  & > button {
    border-collapse: collapse;
    line-height: 30px;
    width: 30px;
    height: 30px;
  }
  & > input {
    border: 1px solid rgb(230, 230, 230);
    padding: 0;
    width: 60px;
    height: 30px;
    text-align: center;
    font-size: 14px;
  }
`;
