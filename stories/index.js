import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { injectFontsAndCSSBase } from "../src/components/common/utils";

injectFontsAndCSSBase();

const defaultTheme = {
  labelBackgroundColor: "#282828",
  labelColor: "white",
  factor: 1.2,
  errorColor: "red"
};

const Provider = storyFn => (
  <ThemeProvider theme={defaultTheme}>{storyFn()}</ThemeProvider>
);
addDecorator(Provider);
require("./input");
require("./select");
require("./file_upload");
require("./list");
