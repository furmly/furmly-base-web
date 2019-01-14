import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { injectFontsAndCSSBase } from "../src/components/common/utils";
import registerServiceWorker from "./utils/registerServiceWorker";
registerServiceWorker();
injectFontsAndCSSBase();
const defaultTheme = {
  labelBackgroundColor: "rgb(203, 163, 163)",
  formComponentBackgroundColor: "transparent",
  labelColor: "rgb(110, 88, 88)",
  accentColor: "orange",
  factor: 1.2,
  inputColor: "rgb(39, 15, 15)",
  modalBackgroundColor: "#ffd3d3",
  errorColor: "#ab0101",
  errorForeground: "white"
};

const Wrapper = storyFn => (
  <div style={{ backgroundColor: "#ffd3d3", padding: 25 }}>{storyFn()}</div>
);
const ProviderForTheme = storyFn => (
  <ThemeProvider theme={defaultTheme}>{storyFn()}</ThemeProvider>
);

addDecorator(ProviderForTheme);
addDecorator(Wrapper);
require("./input");
require("./select");
require("./file_upload");
require("./list");
require("./grid");
require("./section");
require("./progressbar");
require("./actionview");
require("./webview");
require("./html_view");
require("./label");
require("./image");
require("./chips");
