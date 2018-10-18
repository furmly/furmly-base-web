import React from "react";
import { storiesOf } from "@storybook/react";
import configure from "../src/configure";
import { getProcess } from "./fixtures";

const process = getProcess("section");

storiesOf("Section", module).add("Full", () => {
  const controls = configure({ providerConfig: [] });
  const { PROVIDER } = controls;
  return <PROVIDER id={process._id} />;
});
