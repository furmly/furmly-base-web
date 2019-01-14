import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Chip from "../src/components/common/components/Chip";

const onRemove = action("onRemove");
const text = [
  "Adanna",
  "Obi",
  "Uche",
  "Chidi",
  "Something",
  "Nothing",
  "Mummy",
  "Daddy"
];
storiesOf("Chips", module).add("Plenty", () => {
  return (
    <div>
      {text.map(x => (
        <Chip key={x} text={x} onRemove={onRemove} />
      ))}
    </div>
  );
});
