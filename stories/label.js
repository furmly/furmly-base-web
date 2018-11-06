import React from "react";
import { storiesOf } from "@storybook/react";
import configure from "../src/configure";

storiesOf("Label", module).add("Full", () => {
  const controls = configure({ providerConfig: [] });
  const { PROVIDER } = controls;
  return <PROVIDER id={"label"} />;
});
