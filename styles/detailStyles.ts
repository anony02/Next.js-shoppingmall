import { css } from '@emotion/react';

export const detailStyle = css`
  padding: 80px 50px;
  background-clip: content-box;
  display: flex;
`;

export const imgStyle = css`
  width: 500px;
  height: 500px;
  object-fit: contain;
  border: 1px solid rgb(230, 230, 230);
`;

export const infoStyle = css`
  width: 500px;
  height: 500px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  & > * {
    padding: 10px 0;
  }
  & > button {
    margin-top: 10px;
  }
`;

export const titleStyle = css`
  font-weight: bold;
  font-size: 28px;
  border-bottom: 2px solid rgb(220, 220, 220);
`;

export const discountStyle = css`
  color: red;
  font-weight: bold;
  font-size: 20px;
  margin-right: 8px;
`;

export const priceStyle = css`
  font-weight: bold;
  font-size: 24px;
`;

export const soldoutStyle = css`
  color: red;
  font-weight: bold;
  margin-left: 5px;
`;

export const selectStyle = css`
  display: flex;
  line-height: 30px;
  border-bottom: 2px solid rgb(220, 220, 220);
  & > div {
    width: 120px;
    text-align: end;
  }
`;

export const selectboxStyle = css`
  width: 120px;
  height: 30px;
  display: flex;
  align-content: center;
  margin-right: 60px;
  & > button {
    border-collapse: collapse;
    line-height: 30px;
    width: 30px;
    height: 30px;
    font-size: 16px;
    padding: 0;
  }
  & > input {
    border: 1px solid rgb(230, 230, 230);
    padding: 0;
    width: 60px;
    height: 30px;
    text-align: center;
    font-size: 16px;
  }
`;
