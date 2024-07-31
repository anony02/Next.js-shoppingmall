import { css } from '@emotion/react';

export const detailStyle = css`
  margin-top: 50px;
  padding: 3rem 10rem;
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
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;

  & > div {
    margin-top: 1rem;
  }
`;

export const titleStyle = css`
  font-weight: bold;
  font-size: 28px;
  width: 500px;
`;

export const descStyle = css`
  border-top: 2px solid rgb(220, 220, 220);
  border-bottom: 2px solid rgb(220, 220, 220);

  & > * {
    margin-top: 1rem;

    &:last-child {
      margin-bottom: 1rem;
    }
  }
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

export const selectorStyle = css`
  display: flex;
  justify-content: space-between;
  line-height: 30px;

  & > div {
    height: 30px;
    width: 120px;
    text-align: end;
    font-weight: bold;
  }
`;

export const selectboxStyle = css`
  display: flex;

  & > * {
    border: 1px solid black;
    height: 30px;
    line-height: 30px;
  }

  & > button {
    width: 30px;
    font-weight: bold;
    background-color: black;
    color: white;

    &: hover {
      opacity: 0.7;
    }
  }

  & > input {
    width: 60px;
    text-align: center;
    font-size: 14px;

    &:focus {
      outline: none;
    }
  }
`;

export const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
`;
