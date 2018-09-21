import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Select from "../src/components/select";
import Input from "../src/components/input";
import { userProps } from "./input";

const valueChanged = action("valueChanged");
const selectProps = {
  displayProperty: "name",
  description: "This is a description",
  disabled: false,
  label: "Select something...",
  keyProperty: "_id",
  items: [
    {
      _id: 1,
      name: "Chidi Onuekwusi"
    },
    {
      _id: 2,
      name: "Obi Onuekwusi"
    },
    {
      _id: 3,
      name: "Chidi Onuekwusi"
    },
    {
      _id: 4,
      name: "Obi Onuekwusi"
    },
    ,
    {
      _id: 5,
      name: "Chidi Onuekwusi"
    },
    {
      _id: 6,
      name: "Obi Onuekwusi"
    },
    ,
    {
      _id: 7,
      name: "Chidi Onuekwusi"
    },
    {
      _id: 8,
      name: "Obi Onuekwusi"
    },
    ,
    {
      _id: 9,
      name: "Chidi Onuekwusi"
    },
    {
      _id: 10,
      name: "Obi Onuekwusi"
    },
    ,
    {
      _id: 11,
      name: "Chidi Onuekwusi"
    },
    {
      _id: 12,
      name: "Obi Onuekwusi"
    }
  ],
  valueChanged
};

storiesOf("Select", module)
  .add("single input text", () => (
    <Select {...selectProps} valueChanged={valueChanged} />
  ))
  .add("two inputs on a single line", () => (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ display: "inline", width: "50%" }}>
        <Select {...selectProps} />
      </div>
      <div style={{ display: "inline", width: "50%" }}>
        <Select {...selectProps} label="gender" />
      </div>
    </div>
  ))
  .add("input and select", () => (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ display: "inline", width: "50%" }}>
        <Input {...userProps} />
      </div>
      <div style={{ display: "inline", width: "50%" }}>
        <Select {...selectProps} label="Gender" />
      </div>
    </div>
  ));
