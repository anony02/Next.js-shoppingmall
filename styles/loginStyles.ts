import { css } from '@emotion/react';

export const inputStyle = css`
  width: 300px;
  height: 50px;
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

export const buttonStyle = css`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  height: 50px;
  margin-bottom: 1rem;

  &:hover {
    opacity: 0.7;
    border: none;
  }
`;

export const linkContainerStyle = css`
  display: flex;
  height: 30px;
  justify-content: space-evenly;
`;

export const linkStyle = css`
  text-decoration: none;
  color: black;
  position: relative;
  font-size: 0.8rem;
  height: 30px;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }

  &:not(:last-of-type) {
    margin-right: 20px;
  }

  &:not(:last-of-type)::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 50%;
    background-color: #ccc;
    position: absolute;
    right: -10px;
  }
`;
