import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ListLayout from "../src/components/list";

const valueChanged = action("valueChanged");
const layoutProps = {
  description: "This is a description",
  disabled: false,
  label: "Select something...",
  valueChanged
};

storiesOf("List", module).add("List with a bunch of items", () => (
  <ListLayout {...layoutProps} />
));
