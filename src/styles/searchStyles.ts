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

export const searchboxActive = css`
  ${searchbox};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
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
  border-top: none;
  background-color: white;
  color: gray;
  display: flex;
  flex-direction: column;

  & > div {
    margin-top: 6px;
    font-size: 0.8rem;

    &:hover {
      background-color: lightgray;
    }
  }
`;

export const highlightText = css`
  color: black;
  font-weight: bold;
`;
