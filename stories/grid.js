import React from "react";
import { storiesOf } from "@storybook/react";
import GridList, { GridHeader, GridCommandsView } from "../src/components/Grid";
import Input from "../src/components/Input";
import { userProps } from "./input";
import configure from "../src/configure";
import {
  getList,
  getCommands,
  getProcess,
  getSimpleGrid,
  getStep
} from "./fixtures";

const listProps = getList();
const commandsProps = getCommands();
const process = getProcess();
process.steps.push(getStep());
process.steps[0].form.elements.push(getSimpleGrid());

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
    return <PROVIDER id={process._id} />;
  });
