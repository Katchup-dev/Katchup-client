import Header from 'components/common/Header/Header';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { globalStyle, resetStyle } from 'styles/globalStyle';
import theme from 'styles/theme';

import { Global, ThemeProvider } from '@emotion/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { AppProps } from 'next/app';
import Script from 'next/script';
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
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID!}>
            <Global styles={resetStyle} />
            <Global styles={globalStyle} />
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-5SXQH2Y6CX`} />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `  
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-5SXQH2Y6CX', {
                    page_path: window.location.pathname,
                  });`,
              }}
            />
            <Header />
            <Component {...pageProps} />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
