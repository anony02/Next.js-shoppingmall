import { css } from '@emotion/react';

export const searchbox = css`
  display: flex;
  align-items: center;
  background-color: white;
  height: 30px;
  width: 250px;
  border-radius: 10px;
  padding: 0 10px;
  position: relative;
`;

export const searchicon = css`
  height: 20px;
  fill: black;
  margin-right: 10px;
`;

export const searchinput = css`
  border: none;
  padding: 0;
  line-height: 20px;
  outline: none;
  width: 200px;

  &::placeholder {
    color: gray;
  }
`;

export const dropdownStyle = css`
  position: absolute;
  z-index: 1;
  width: 250px;
  max-height: 500px;
  padding: 0px 10px 6px;
  top: 100%;
  right: 0px;
  overflow: auto;
  border: 1px solid rgb(240, 240, 240);
  background-color: white;
  color: gray;
  display: flex;
  flex-direction: column;
  & > a {
    text-decoration: none;
    margin-top: 6px;
    font-size: 14px;
    white-space: pre-wrap;
    color: black;
    &:hover {
      background-color: lightgray;
    }
  }
`;
