import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import GridList, { GridHeader, GridLayout } from "../src/components/Grid";

const itemClicked = action("itemClicked");
const itemRemoved = action("itemRemoved");
const listProps = {
  description: "This is a description",
  disabled: false,
  label: "Select something...",
  rowClicked: itemClicked,
  rowRemoved: itemRemoved,
  items: [{ name: "Chidi", _id: 1 }, { name: "Obi", _id: 2 }]
};
const rowTemplate = {
  name: "expression",
  config: {
    exp: "My name is {name} and my ID is {_id}"
  }
};
const layoutProps = {
  value: "To do list",
  description: "This is what i want to do with my life"
};
storiesOf("Full grid", module).add("normal", () => <GridList {...listProps} />);
