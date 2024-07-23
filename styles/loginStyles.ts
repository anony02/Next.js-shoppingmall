import { css } from '@emotion/react';

export const loginStyle = css`
  padding-top: 50px;
  background-clip: content-box;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const logoStyle = css`
  font-weight: bold;
  text-decoration: none;
  color: black;
  font-size: 18px;
  margin-bottom: 40px;
`;

export const wrapStyle = css`
  background-color: rgb(240, 240, 240);
  padding: 10px;
`;

export const containerStyle = css`
  display: flex;
  height: 50px;
  align-items: center;
  & > * {
    height: 30px;
    margin-right: 10px;
  }
  & > div:first-child {
    width: 100px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
  }
  & > div:last-child {
    width: 200px;
  }
  & > input {
    height: 30px;
    margin: 10px 0;
    width: 200px;
    padding: 10px;
  }
  & > input::placeholder {
    text-align: center;
  }
  & > button {
    width: 300px;
    margin-left: 10px;
    background-color: rgb(100, 100, 100);
    color: white;
    font-weight: bold;
  }
  & > button:hover {
    border: none;
    background-color: rgba(100, 100, 100, 0export const 5);
  }
`;

export const btnwrap = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const btn = css`
  width: 30px;
  margin: 5px;
  border-radius: 8px;
  &:hover {
    opacity: 0.5;
  }
`;
