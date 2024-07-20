import { Global, css } from '@emotion/react';
import { AppProps } from 'next/app';

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
    font-weight: 900;
    color: #0b57d0;
  }

  input:checked + span {
    font-weight: 900;
    color: #0b57d0;
  }

  button {
    border: 1px solid rgb(230, 230, 230);
    background-color: rgb(230, 230, 230);
  }

  button:hover {
    border: 1px solid black;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
