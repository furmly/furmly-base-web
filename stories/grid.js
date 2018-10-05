import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import GridList, {
  GridHeader,
  GridLayout,
  GridCommandsView
} from "../src/components/Grid";
import Input from "../src/components/Input";
import { userProps } from "./input";
import configure from "../src/configure";

const itemClicked = action("itemClicked");
const itemRemoved = action("itemRemoved");
const done = action("done");
const execCommand = action("execCommand");
const commandsProps = {
  visibility: true,
  title: "What would you like to do ?",
  done,
  execCommand,
  commands: [
    {
      commandText: "Do some creative thing at the backend",
      commandIcon: "person",
      commandType: "BACKEND"
    },
    {
      commandText: "Write a cheque",
      commandIcon: "person",
      commandType: "WRITE_A_CHEQUE"
    },
    {
      commandText: "Cash a cheque",
      commandIcon: "person",
      commandType: "CHEQUE_CASHER"
    }
  ]
};
const listProps = {
  description: "This is a description",
  disabled: false,
  label: "Select something...",
  rowClicked: itemClicked,
  rowRemoved: itemRemoved,
  items: []
};
for (let i = 1; i <= 23; i += 1) {
  listProps.items.push({
    name: "Person " + i,
    _id: i,
    description: "This is why i'm hot",
    created: new Date().toLocaleDateString()
  });
}
listProps.total = listProps.items.length;
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
storiesOf("Grid", module)
  .add("List only", () => <GridList {...listProps} />)
  .add("Header only", () => (
    <GridHeader>
      <Input {...userProps} />
    </GridHeader>
  ))
  .add("CommandView only", () => <GridCommandsView {...commandsProps} />)
  .add("Full", () => {
    const controls = configure();
    const { GRID } = controls;
    return <GRID {...gridProps} />;
  });
