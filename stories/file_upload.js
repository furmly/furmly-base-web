import React from "react";
import { storiesOf } from "@storybook/react";
import { decorateAction, action } from "@storybook/addon-actions";
import FileUpload, {
  XlsxPreview
} from "../src/components/file_upload/file_upload";

const props = {
  displayProperty: "name",
  description: "This is a description",
  disabled: false,

  title: "Upload CV",
  keyProperty: "_id",
  previewType: XlsxPreview,
  preview: [{ name: "Chidi", _id: 1 }, { name: "Obi", _id: 2 }],
  allowed: "png|jpeg|jpg"
};
const upload = decorateAction([
  args => {
    alert("fired");
    return args;
  }
]);
props.upload = upload("tried to upload something");

storiesOf("FileUpload", module).add("single file upload", () => (
  <FileUpload {...props} valueChanged={action("valueChanged")} />
));
