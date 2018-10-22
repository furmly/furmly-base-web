import React from "react";
import { storiesOf } from "@storybook/react";
import ProgressBar from "../src/components/common/components/ProgressBar";

storiesOf("Progress Bar", module).add("Indeterminate", () => <ProgressBar />);
