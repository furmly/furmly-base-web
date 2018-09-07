import React from "react";
import styled from "styled-components";
import { inputFactory, onChange } from "./input";
import {
  labelColor,
  minimumInputHeight,
  smallText,
  errorColor
} from "../common/variables";

const Label = styled.label`
  margin-left: ${props => props.theme.factor * 5}px;
  vertical-align: middle;
  font-size: ${smallText}px;
  text-transform: uppercase;
  display: inline-block;
  transition: background-color 1s;
  &.error {
    background-color: ${errorColor};
  }
`;

const Wrapper = styled.div`
  height: ${minimumInputHeight}px;
`;
const Container = styled.div`
  display: inline-block;
  width: ${props => props.theme.factor * 66}px;
  height: 26px;
  background: #333;
  position: relative;
//   border-radius: 50px;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5),
    0px 1px 0px rgba(255, 255, 255, 0.2);
  &:after {
    content: "NO";
    color: ${labelColor};
    position: absolute;
    right: 10px;
    z-index: 0;
    font: 12px/26px Arial, sans-serif;
    font-weight: bold;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.15);
  }
  &:before {
    content: "YES";
    color: ${labelColor};
    position: absolute;
    left: 10px;
    z-index: 0;
    font: 12px/26px Arial, sans-serif;
    font-weight: bold;
  }
`;
const Nob = styled.label`
  display: block;
  width: 34px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  pointer-events:none;
  top: 3px;
  left: 3px;
  z-index: 1;
  background: #fcfff4;
  background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
//   border-radius: 50px;
  transition: all 0.4s ease;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
//   visibility: hidden;
  &:checked + label {
    left: 43px;
  }
`;

export default inputFactory(props => {
  return (
    <Wrapper>
      <Container>
        <Checkbox
          value="None"
          checked={!!props.value}
          onChange={onChange.bind(this, props.valueChanged)}
        />
        <Nob />
      </Container>
      <Label>{props.label}</Label>
    </Wrapper>
  );
}, true);
