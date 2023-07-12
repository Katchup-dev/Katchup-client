import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { globalStyle, resetStyle } from 'styles/globalStyle';

import type { AppProps } from 'next/app';
import Header from 'components/common/Header';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import theme from 'styles/theme';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    function adjustPageZoom() {
      const screenWidth = window.innerWidth;
      const zoomRatio = screenWidth / 1920; // MEMO :: 1920px가 기준 화면 너비

      document.body.style.zoom = zoomRatio;
    }
    adjustPageZoom();

    // 페이지 로드 시 및 화면 크기 변경 시 확대 적용
    window.addEventListener('load', adjustPageZoom);
    window.addEventListener('resize', adjustPageZoom);
  }, []);

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
