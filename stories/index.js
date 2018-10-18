import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { injectFontsAndCSSBase } from "../src/components/common/utils";
import registerServiceWorker from "./utils/registerServiceWorker";
registerServiceWorker();
injectFontsAndCSSBase();
const defaultTheme = {
  labelBackgroundColor: "#383838",
  formComponentBackgroundColor: "white",
  labelColor: "white",
  factor: 1.2,
  errorColor: "#ab0101",
  errorForeground: "white"
};

const ProviderForTheme = storyFn => (
  <ThemeProvider theme={defaultTheme}>{storyFn()}</ThemeProvider>
);

addDecorator(ProviderForTheme);
require("./input");
require("./select");
require("./file_upload");
require("./list");
require("./grid");
require("./section");
