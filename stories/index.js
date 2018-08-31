import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ThemeProvider } from "styled-components";
import Input from "../components/input";
const defaultTheme = {
  labelBackgroundColor: "#282828",
  labelColor: "white",
  factor: 1.2,
  errorColor: "red"
};

storiesOf("Button", module)
  .add("with text", () => (
    <button onClick={action("clicked")}>Hello Button</button>
  ))
  .add("with some emoji", () => (
    <button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </button>
  ));

storiesOf("Input", module)
  .add("single input text", () => (
    <ThemeProvider theme={defaultTheme}>
      <Input
        description="This is text that is supposed to help you."
        name="firstName"
        label="First Name"
        elementType="INPUT"
      />
    </ThemeProvider>
  ))
  .add("two inputs on a single line", () => (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ display: "inline", width: "50%" }}>
          <Input
            description="This is text that is supposed to help you."
            name="firstName"
            label="First Name"
            elementType="INPUT"
          />
        </div>
        <div style={{ display: "inline", width: "50%" }}>
          <Input
            description="This is text that is supposed to help you."
            name="lastName"
            label="Surname"
            elementType="INPUT"
          />
        </div>
      </div>
    </ThemeProvider>
  ))
  .add("one input with errors", () => (
    <ThemeProvider theme={defaultTheme}>
      <Input
        name="lastName"
        label="Surname"
        elementType="INPUT"
        errors={["Something bad has happened", "Your name is compulsory"]}
      />
    </ThemeProvider>
  ))
  .add("one numerical input", () => (
    <ThemeProvider theme={defaultTheme}>
      <Input
        name="age"
        label="How old are you?"
        elementType="INPUT"
        type="number"
      />
    </ThemeProvider>
  ));
