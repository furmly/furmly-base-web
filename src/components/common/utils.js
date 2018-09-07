import { css, injectGlobal } from "styled-components";
import Lato from "../../fonts/Lato-Light.ttf";
import Roboto from "../../fonts/Roboto-Thin.ttf";

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
}
`;
