'use client';
import { Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../utils/queryClient';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import globalStyles from '../styles/globalStyles';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <Global styles={globalStyles} />
            <Nav />
            {children}
            <Footer />
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
