import { css } from '@emotion/react';

export const nav = css`
  height: 50px;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  background-color: rgb(240, 240, 240);
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1;
`;

export const leftwrap = css`
  display: flex;
  align-items: center;
  margin-right: auto;
  & > * {
    margin: 0 5px;
  }
`;

export const rightwrap = css`
  display: flex;
  align-items: center;
  & > * {
    margin: 0 5px;
  }
`;

export const btnwrap = css`
  display: flex;
  align-items: center;
`;

export const category = css`
  position: relative;
  display: flex;
  &:hover .list {
    visibility: visible;
  }
`;

export const btn = css`
  width: 30px;
`;

export const listStyle = css`
  position: absolute;
  visibility: hidden;
  z-index: 1;
  background-color: white;
  border: 1px solid rgb(200, 200, 200);
  padding: 10px;
  font-size: 12px;
  top: 100%;
  line-height: 200%;
  width: 130px;
  white-space: pre-wrap;
  & > a {
    text-decoration: none;
    color: black;
    &:hover {
      color: #0b57d0;
      font-weight: 900;
    }
  }
`;

export const logo = css`
  font-weight: bold;
  text-decoration: none;
  color: black;
`;
