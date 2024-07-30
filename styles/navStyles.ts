import { css, keyframes } from '@emotion/react';

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

export const category = css`
  display: flex;
  flex-direction: column;
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(-22px);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

export const listStyle = css`
  position: absolute;
  visibility: visible;
  z-index: 1;
  background-color: rgb(240, 240, 240);
  border-right: 1px solid rgb(200, 200, 200);
  padding: 1rem;
  font-size: 0.75rem;
  top: 50px;
  line-height: 200%;
  width: 10rem;
  height: calc(100vh - 50px);
  animation: ${slideOut} 0.3s forwards;

  &.open {
    animation: ${slideIn} 0.3s forwards;
  }

  & > a {
    display: block;
    text-decoration: none;
    color: black;
    &:hover {
      color: blue;
      font-weight: bold;
    }
  }
`;

export const selectedCategoryStyle = css`
  color: blue !important;
  font-weight: bold;
`;

export const rightwrap = css`
  display: flex;
  align-items: center;
  & > * {
    margin: 0 5px;
  }
`;

export const btnwrap = css`
  position: relative;
`;

export const buttonStyle = css`
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    border: none;
    opacity: 0.5;
  }
`;

export const btn = css`
  width: 30px;
`;

export const popupStyle = css`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 0.5rem;
  font-size: 0.75rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 10;
`;
