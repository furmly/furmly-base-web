import React from "react";
import styled from "styled-components";
import {
  labelBackgroundColor,
  smallText,
  labelPadding,
  errorColor,
  errorForegroundColor,
  labelColor
} from "../variables";

import { setupReversal } from "../utils";

export const Label = styled.label`
  background-color: ${setupReversal(labelBackgroundColor, labelColor)};
  color: ${setupReversal(labelColor, labelBackgroundColor)};
  padding: ${labelPadding}px;
  font-size: ${smallText}px;
  font-weight: bold;
  display: inline-block;
  transition: color 1s;
  &.error {
    color: ${errorForegroundColor};
    background-color: ${errorColor};
    transition: color 1s;
  }
`;

const FormLabelContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  visibility: ${props => (props.hide && "hidden") || "visible"};
  &.no-indicator {
    overflow: visible;
  }
`;

export default props => {
  const { className, ...rest } = props;
  return (
    <FormLabelContainer className={className}>
      <Label {...rest} />
    </FormLabelContainer>
  );
};
