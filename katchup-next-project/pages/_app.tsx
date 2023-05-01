import { resetStyle, globalStyle } from 'styles/globalStyle';
import theme from 'styles/theme';

import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@tanstack/react-query-devtools/build/lib/theme';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Global styles={resetStyle} />
          <Global styles={globalStyle} />
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
