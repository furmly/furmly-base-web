import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import FileUpload from "../src/components/file_upload";

const valueChanged = action("valueChanged");
const props = {
  displayProperty: "name",
  description: "This is a description",
  disabled: false,
  upload: action("tried to upload something"),
  title: "Upload CV",
  keyProperty: "_id",
  valueChanged
};

storiesOf("FileUpload", module).add("single file upload", () => (
  <FileUpload {...props} />
));
