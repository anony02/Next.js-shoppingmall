import { css } from '@emotion/react';

const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  label:hover {
    font-weight: bold;
    color: blue;
  }

  input:checked + span {
    font-weight: bold;
    color: blue;
  }

  button {
    border: 1px solid rgb(230, 230, 230);
    background-color: rgb(230, 230, 230);
  }

  button:hover {
    border: 1px solid black;
  }

  html,
  body,
  #__next {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
  }

  #__next {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  main {
    flex: 1;
  }
`;

export default globalStyles;
