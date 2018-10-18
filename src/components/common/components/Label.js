import React from "react";
import styled from "styled-components";
import {
  labelBackgroundColor,
  smallText,
  errorColor,
  errorForegroundColor,
  labelColor,
  formLineWidth
} from "../variables";
import FormDiv from "../components/FormDiv";
import { setupReversal } from "../utils";

export const Label = styled.label`
  background-color: ${setupReversal(labelBackgroundColor, labelColor)};
  color: ${setupReversal(labelColor, labelBackgroundColor)};
  padding: ${props => props.theme.factor * 5}px;
  font-size: ${smallText}px;
  text-transform: uppercase;
  font-weight:bold;
  display: inline-block;
  transition: background-color 1s;
  &.error {
    background-color: ${errorColor};
    color: ${errorForegroundColor};
  }
`;

const FormLabelContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  visibility: ${props => (props.hide && "hidden") || "visible"};
`;
const FocusIndicator = styled.hr`
  width: 100%;
  transform: translateX(-100%);
  position: absolute;
  bottom: 0px;
  border: none;
  margin: 0px;
  height: ${formLineWidth}px;
  background-color: ${labelBackgroundColor};
  transition-property: transform;
  transition-duration: 0.5s;
  transition-delay: 200ms;
  ${FormDiv}:hover & {
    transform: translateX(0);
  }
  ${Label}.error+& {
    background-color: ${errorColor};
  }
`;
export default props => (
  <FormLabelContainer>
    <Label {...props} />
    <FocusIndicator />
  </FormLabelContainer>
);
