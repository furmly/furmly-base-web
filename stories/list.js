import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import List, { Layout, Button } from "../src/components/List";

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
storiesOf("List", module)
  .add("normal", () => <List {...listProps} />)
  .add("disabled", () => <List {...listProps} disabled />)
  .add("with row template", () => (
    <List {...listProps} rowTemplate={rowTemplate} />
  ))
  .add("layout", () => (
    <Layout {...layoutProps}>
      <List {...listProps} rowTemplate={rowTemplate} />
    </Layout>
  ))
  .add("2 lists", () => (
    <div style={{ width: "100%" }}>
      <div style={{ width: "50%", marginBottom: 25 }}>
        <Layout {...layoutProps}>
          <List {...listProps} rowTemplate={rowTemplate} />
          <Button />
        </Layout>
      </div>
      <div style={{ width: "50%" }}>
        <Layout
          {...layoutProps}
          errors={["Something is wrong bruh", "You should just npm it"]}
        >
          <List {...listProps} rowTemplate={rowTemplate} />
          <Button />
        </Layout>
      </div>
    </div>
  ));
