import React from "react";
import styled from "styled-components";
import {
  labelBackgroundColor,
  smallText,
  errorColor,
  labelColor,
  formLineWidth
} from "../variables";
import FormDiv from "../components/FormDiv";

export const Label = styled.label`
  background-color: ${labelBackgroundColor};
  color: ${labelColor};
  padding: ${props => props.theme.factor * 5}px;
  font-size: ${smallText}px;
  text-transform: uppercase;
  display: inline-block;
  transition: background-color 1s;
  &.error {
    background-color: ${errorColor};
  }
`;

const FormLabelContainer = styled.div`
  width: 100%;
  position: relative;
  visibility: ${props => (props.hide && "hidden") || "visible"};
`;
const FocusIndicator = styled.hr`
  width: 0%;
  position: absolute;
  bottom: 0px;
  border: none;
  margin: 0px;
  height: ${formLineWidth}px;
  background-color: ${labelBackgroundColor};
  transition: width ease-in-out 0.5s;
  transition-delay: 200ms;
  ${FormDiv}:hover & {
    width: 100%;
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
