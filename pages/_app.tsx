import { Global } from '@emotion/react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../utils/queryClient';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import globalStyles from '../styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles} />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
