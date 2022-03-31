import '../styles/globals.css'
import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import WalletWrapper from '../components/WalletWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <WalletWrapper>
        <Component {...pageProps} />
      </WalletWrapper>
    </QueryClientProvider>
  )
}
export default MyApp
