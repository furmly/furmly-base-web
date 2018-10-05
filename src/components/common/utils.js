import { css, injectGlobal } from "styled-components";
import Lato from "../../fonts/Lato-Light.ttf";
import Roboto from "../../fonts/Roboto-Thin.ttf";
import { lineHeight } from "./variables";

export const createMedia = (
  xSmall = 600,
  small = 600,
  medium = 768,
  large = 992,
  xlarge = 1200
) => ({
  xSmall: (...content) => css`
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: ${xSmall}px) {
      ${css(...content)};
    }
  `,
  small: (...content) => css`
    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: ${small}px) {
      ${css(...content)};
    }
  `,
  medium: (...content) => css`
    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: ${medium}px) {
      ${css(...content)};
    }
  `,
  large: (...content) => css`
    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: ${large}px) {
      ${css(...content)};
    }
  `,
  xlarge: (...content) => css`
    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: ${xlarge}px) {
      ${css(...content)};
    }
  `
});
export const media = createMedia();

export const injectFontsAndCSSBase = () => injectGlobal`
textarea, select, input, button { outline: none; }
button {
  padding:0px;
}
* {
  box-sizing: border-box;
}
@font-face {
  font-family:'Lato';
  src:url(${Lato})
}
@font-face {
  font-family:'Roboto';
  src:url(${Roboto})
}

body,button{
  font-family:Lato;
  line-height:${lineHeight};
}
`;

export const getSlice = (page, count) => {
  let start = (page - 1) * count;
  let end = start + count;
  return {
    start,
    end
  };
};

export const convertToString = obj => {
  if (obj && typeof obj == "object")
    return Object.keys(obj).reduce((sum, x) => {
      return (sum += " " + x + " " + obj[x] + "\n");
    }, "");

  return obj;
};
export const camelCaseToWord = string => {
  if (!string) return;
  return string.replace(/([A-Z]+)/g, " $1").replace(/^./, function(str) {
    return str.toUpperCase();
  });
};

export const navigationActionss = {};
