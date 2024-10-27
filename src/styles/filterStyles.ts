import { css } from '@emotion/react';

export const filterStyles = css`
  display: inline;
  line-height: 4rem;
  font-size: 0.75rem;
  padding: 0 0.25rem;
  cursor: pointer;

  & > input {
    display: none;
  }
`;
