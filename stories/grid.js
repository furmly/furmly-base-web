import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import GridList, { GridHeader, GridCommandsView } from "../src/components/Grid";
import Input from "../src/components/input";
import { userProps } from "./input";
import configure from "../src/configure";
import { getList, getCommands, getProcess } from "./fixtures";

const listProps = getList(action("itemClicked"), action("itemRemoved"));
const commandsProps = getCommands();
const process = getProcess();

storiesOf("Grid", module)
  .add("List only", () => <GridList {...listProps} />)
  .add("Header only", () => (
    <GridHeader>
      <Input {...userProps} />
    </GridHeader>
  ))
  .add("CommandView only", () => <GridCommandsView {...commandsProps} />)
  .add("Full", () => {
    const controls = configure({ providerConfig: [] });
    const { PROVIDER } = controls;
    return <PROVIDER id={process._id} showMessage={m => window.alert(m.message)} />;
  });
