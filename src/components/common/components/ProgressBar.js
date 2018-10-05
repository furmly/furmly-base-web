import React from "react";
import styled from "styled-components";
import { labelBackgroundColor } from "../variables";
import { spin } from "../animations";

const Spinner = styled.svg`
  width: 135px;
  height: 135px;
  fill: ${props => props.color || labelBackgroundColor(props)};
  animation: ${spin};
`;
const Indeterminate = props => (
  <Spinner {...props}>
    <path d="M125,85 a60,60 0 1,0 -115,0" fill="#E79A16" />
    <path d="M10,85 a60,60 0 0,0 115,0" fill="#D78500" />
  </Spinner>
);

export default Indeterminate;
