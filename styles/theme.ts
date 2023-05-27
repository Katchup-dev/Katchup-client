import { css, Theme } from '@emotion/react';

const colors = {
  katchup_main: '#FF4646',
  katchup_black: '#242424',
  katchup_dark_gray: '#8B8B8B',
  katchup_gray: '#C2C2C2',
  katchup_line_gray: '#E2E2E2',
  katchup_light_gray: '#F5F5F5',
  katchup_bg_gray: '#FAFAFA',
  katchup_white: '#FFFFFF',
};

interface Font {
  weight: 400 | 500 | 600 | 700;
  size: number;
  height: number;
}

function FONT_KOR({ weight, size, height }: Font) {
  return css`
    font-style: normal;
    font-weight: ${weight};
    font-size: ${size}rem;
    line-height: ${height}rem;
  `;
}

function FONT_ENG({ weight, size, height }: Font) {
  return css`
    font-style: normal;
    font-weight: ${weight};
    font-size: ${size}rem;
    line-height: ${height}rem;
  `;
}
const fonts = {
  h1_bigtitle: FONT_KOR({ weight: 600, size: 3.6, height: 4.296 }),
  h2_bigtitle: FONT_KOR({ weight: 500, size: 3.1, height: 3.1 }),
  h1_smalltitle: FONT_KOR({ weight: 600, size: 2.2, height: 2.6 }),
  h1_title: FONT_KOR({ weight: 700, size: 2, height: 2.4 }),
  h2_title: FONT_KOR({ weight: 600, size: 1.8, height: 2.1 }),
  h2_smalltitle: FONT_KOR({ weight: 500, size: 1.8, height: 2.1 }),
  h3_title: FONT_KOR({ weight: 600, size: 1.6, height: 1.9 }),
  p1_text: FONT_KOR({ weight: 400, size: 1.6, height: 2.8 }),
  p2_text: FONT_KOR({ weight: 500, size: 1.4, height: 1.7 }),
  p3_text: FONT_KOR({ weight: 400, size: 1.4, height: 2 }),
  caption: FONT_KOR({ weight: 400, size: 1.2, height: 1.4 }),
  h1_bigtitle_eng: FONT_ENG({ weight: 600, size: 3.6, height: 4.296 }),
  h2_bigtitle_eng: FONT_ENG({ weight: 500, size: 3.1, height: 3.1 }),
  h1_smalltitle_eng: FONT_ENG({ weight: 600, size: 2.2, height: 2.6 }),
  h1_title_eng: FONT_ENG({ weight: 700, size: 2, height: 2.4 }),
  h2_title_eng: FONT_ENG({ weight: 600, size: 1.8, height: 2.1 }),
  h2_smalltitle_eng: FONT_ENG({ weight: 500, size: 1.8, height: 2.1 }),
  h3_title_eng: FONT_ENG({ weight: 600, size: 1.6, height: 1.9 }),
  p1_text_eng: FONT_ENG({ weight: 400, size: 1.6, height: 2.8 }),
  p2_text_eng: FONT_ENG({ weight: 500, size: 1.4, height: 1.7 }),
  p3_text_eng: FONT_ENG({ weight: 400, size: 1.4, height: 2 }),
  caption_eng: FONT_ENG({ weight: 400, size: 1.2, height: 1.4 }),
};

const theme: Theme = {
  colors,
  fonts,
};
export default theme;
