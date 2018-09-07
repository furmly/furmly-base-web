import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Input, { DatePicker } from "../src/components/input";

const valueChanged = action("valueChanged");
const time = new Date();
const prev = new Date();
prev.setDate(time.getDate() - 5);
const dateProps = {
  name: "dateOfBirth",
  description: "This is the day you were born.",
  label: "Date of Birth",
  type: "DATE",
  value: null,
  minDate: prev,
  maxDate: time,
  fromValue: prev,
  toValue: time,
  isRange: true,
  fromValueChanged: action("fromValueChanged"),
  toValueChanged: action("toValueChanged"),
  valueChanged
};

const singleDateProps = Object.assign({}, dateProps, { isRange: false });

const userProps = {
  description: "This is text that is supposed to help you.",
  name: "firstName",
  label: "First Name",
  elementType: "INPUT",
  valueChanged
};
storiesOf("Input", module)
  .add("single input text", () => (
    <Input {...userProps} valueChanged={valueChanged} />
  ))
  .add("two inputs on a single line", () => (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ display: "inline", width: "50%" }}>
        <Input {...userProps} />
      </div>
      <div style={{ display: "inline", width: "50%" }}>
        <Input {...userProps} name="lastname" label="surname" />
      </div>
    </div>
  ))
  .add("one input with errors", () => (
    <Input
      {...userProps}
      errors={["Something bad has happened", "Your name is compulsory"]}
    />
  ))
  .add("one numerical input", () => (
    <Input
      name="age"
      label="How old are you?"
      elementType="INPUT"
      type="number"
      valueChanged={valueChanged}
    />
  ))
  .add("date input", () => <DatePicker {...dateProps} />)
  .add("several date pickers and inputs", () => (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ display: "inline", width: "50%" }}>
        <Input {...userProps} />
      </div>
      <div style={{ display: "inline", width: "50%" }}>
        <DatePicker {...singleDateProps} />
      </div>
    </div>
  ));
