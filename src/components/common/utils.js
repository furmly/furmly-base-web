import { css, injectGlobal } from "styled-components";
import { replace, push } from "react-router-redux";
import qs from "query-string";
import {
  setParams,
  goBack,
  clearNavigationStack,
  replaceStack,
  alreadyVisible
} from "furmly-client";
import {
  lineHeight,
  accentColor,
  labelBackgroundColor,
  labelColor
} from "./variables";

export const INTENTS = {
  ACCENT: "ACCENT",
  DEFAULT: "DEFAULT"
};
export const getColorFromIntent = name => {
  switch (name) {
    case INTENTS.ACCENT:
      return { backgoundColor: accentColor, foregroundColor: labelColor };
    case INTENTS.DEFAULT:
      return {
        backgoundColor: labelBackgroundColor,
        foregroundColor: labelColor
      };
  }
};

export const setupReversal = (x, y) => props =>
  (props.reverse && y(props)) || x(props);

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

export const injectFontsAndCSSBase = (resourceDir = "./") => injectGlobal`
textarea, select, input, button { outline: none; }
button {
  padding:0px;
}
* {
  box-sizing: border-box;
}
@font-face {
  font-family:'Lato';
  src:url(${resourceDir}Lato-Light.ttf)
}
@font-face {
  font-family:'Roboto';
  src:url(${resourceDir}Roboto-Thin.ttf)
}

body,button,input,textarea, {
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

const navigationMap = {
  Furmly: { path: "/home/furmly/:id", routeParams: ["id"] }
};
const extractLocationAndParams = function({ params, key }, navigationContext) {
  let loc = (navigationContext || navigationMap)[key];
  if (!loc) throw new Error("unknown navigation");
  if (loc.routeParams) {
    loc.routeParams.forEach(x => {
      if (!params[x]) throw new Error(`routeParam missing ${x}`);
    });
  }
  let path = loc.path
    .split("/")
    .map(x => {
      if (x.indexOf(":") !== -1) return params[x.substring(1)];
      return x;
    })
    .join("/");
  if (params.fetchParams) {
    path += `?${qs.stringify(params.fetchParams)}`;
  }
  return path;
};
export const navigationActions = {
  setParams: function(args, navigationContext, navigation) {
    let path = extractLocationAndParams(args, navigationContext);
    return (
      navigation.dispatch(setParams(args)), navigation.dispatch(push(path))
    );
  },
  replaceStack: function(arr, navigationContext, navigation) {
    let path = extractLocationAndParams(arr[arr.length - 1], navigationContext);
    return (
      navigation.dispatch(replaceStack(arr)), navigation.dispatch(replace(path))
    );
  },
  navigate: function(args, navigationContext, navigation) {
    let path = extractLocationAndParams(args, navigationContext);
    return (
      navigation.dispatch(setParams(args)), navigation.dispatch(push(path))
    );
  },
  goBack: function(navigation, args) {
    return navigation.dispatch(goBack(args));
  },
  clear: function(navigation) {
    return navigation.dispatch(clearNavigationStack());
  },
  alreadyVisible: function(navigation, args) {
    return navigation.dispatch(alreadyVisible(args));
  }
};

const createImageSize = (
  propName,
  defaultDimensions = {},
  defaultMediaQueries = ""
) => {
  return css`
    ${props =>
      (props.theme[propName] &&
        "width:" +
          props.theme[propName].width +
          "px;height:" +
          props.theme[propName].height +
          "px;") ||
      " width: " +
        defaultDimensions.width +
        "px;height:" +
        defaultDimensions.height +
        "px;"}
    ${props =>
      (props.theme[propName] &&
        props.theme[propName].media &&
        props.theme[propName].media()) ||
      defaultMediaQueries};
  `;
};
const width = 16;
const height = 16;
export const displayImageSize = createImageSize("displayImageSize", {
  width: width * 8,
  height: height * 8
});
export const avatarImageSize = createImageSize("avatarImageSize", {
  width: width * 3,
  height: height * 3
});
export const thumbnailImageSize = createImageSize("thumbnailImageSize", {
  width,
  height
});
export const profileImageSize = createImageSize("profileImageSize", {
  width: width * 4,
  height: height * 4
});
export const defaultImageSize = createImageSize(
  "defaultImageSize",
  {
    width: width * 5,
    height: width * 5
  },
  media.xSmall`
height:60px;
width:60px;
`
);
