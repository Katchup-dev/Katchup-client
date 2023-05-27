import { resetStyle, globalStyle } from 'styles/globalStyle';
import theme from 'styles/theme';

import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import Header from 'components/common/Header';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Global styles={resetStyle} />
          <Global styles={globalStyle} />
          <Header profileImgSrc="https://sitem.ssgcdn.com/17/01/59/item/1000053590117_i1_1100.jpg" />
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
