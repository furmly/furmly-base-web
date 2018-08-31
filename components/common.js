import styled, { injectGlobal } from "styled-components";
import Lato from "../fonts/Lato-Light.ttf";
import Roboto from "../fonts/Roboto-Thin.ttf";
import React from "react";

export const smallText = props => props.theme.factor * 14;
export const smallestText = props => props.theme.factor * 12;
export const bodyText = props => props.theme.factor * 16;
export const labelBackgroundColor = props => props.theme.labelBackgroundColor;
export const labelColor = props => props.theme.labelColor;
export const errorColor = props => props.theme.errorColor || "red";
export const FormDiv = styled.div`
  padding: ${props => props.theme.factor * 10}px;
  background-color: #00000003;
`;

export const Label = styled.label`
  background-color: ${labelBackgroundColor};
  color: ${labelColor};
  padding: ${props => props.theme.factor * 5}px;
  font-size: ${smallText}px;
  display: inline-block;
  transition: background-color 1s;
  &.error {
    background-color: ${errorColor};
  }
`;

const FormLabelContainer = styled.div`
  width: 100%;
  position: relative;
`;
const FocusIndicator = styled.hr`
  width: 0%;
  position: absolute;
  bottom: 0px;
  border: none;
  margin: 0px;
  height: ${props => props.theme.factor * 2}px;
  background-color: ${labelBackgroundColor};
  transition: width ease-in-out 0.5s;
  ${FormDiv}:hover & {
    width: 100%;
  }
  ${Label}.error+& {
    background-color: ${errorColor};
  }
`;
export const FormLabel = props => (
  <FormLabelContainer>
    <Label {...props} />
    <FocusIndicator />
  </FormLabelContainer>
);
export const ErrorText = styled.p`
  color: ${errorColor};
  font-size: ${smallestText}px;
  margin: 1px 0px;
  display: block;
`;

export const Copy = styled.span`
  color: ${props => props.theme.copyColor || "gray"};
  font-size: ${smallestText}px;
  display: block;
`;

injectGlobal`
textarea, select, input, button { outline: none; }
@font-face {
  font-family:'Lato';
  src:url(${Lato})
}
@font-face {
  font-family:'Roboto';
  src:url(${Roboto})
}
body{
  font-family:Lato;
}
`;
