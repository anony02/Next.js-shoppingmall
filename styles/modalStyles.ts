import { css } from '@emotion/react';

export const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const modalStyle = css`
  background: white;
  padding: 2rem;
  font-weight: bold;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

export const buttonStyle = css`
  padding: 0.5rem;
  font-size: 0.75rem;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  width: 4rem;
  height: 2rem;
  margin: 1rem 0.5rem 0;

  &:hover {
    opacity: 0.7;
    border: none;
  }
`;
