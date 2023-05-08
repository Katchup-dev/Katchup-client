import { SerializedStyles } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      katchup_main: string;
      katchup_black: string;
      katchup_dark_gray: string;
      katchup_gray: string;
      katchup_line_gray: string;
      katchup_light_gray: string;
      katchup_bg_gray: string;
      katchup_white: string;
    };
    fonts: {
      h1_bigtitle: SerializedStyles;
      h2_bigtitle: SerializedStyles;
      h1_smalltitle: SerializedStyles;
      h1_title: SerializedStyles;
      h2_title: SerializedStyles;
      h2_smalltitle: SerializedStyles;
      h3_title: SerializedStyles;
      p1_text: SerializedStyles;
      p2_text: SerializedStyles;
      p3_text: SerializedStyles;
      caption: SerializedStyles;
      h1_bigtitle_eng: SerializedStyles;
      h2_bigtitle_eng: SerializedStyles;
      h1_smalltitle_eng: SerializedStyles;
      h1_title_eng: SerializedStyles;
      h2_title_eng: SerializedStyles;
      h2_smalltitle_eng: SerializedStyles;
      h3_title_eng: SerializedStyles;
      p1_text_eng: SerializedStyles;
      p2_text_eng: SerializedStyles;
      p3_text_eng: SerializedStyles;
      caption_eng: SerializedStyles;
    };
  }
}
