//ssr이라 처음에는 스타일이 아무것도 안된 html만 보이니까 미리 초기 스타일을 지정해주는 파일!
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>Katchup</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {/* 여기에 폰트 임포팅 // 여기에 공통 CSS e.g.reset-css/common.css */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
