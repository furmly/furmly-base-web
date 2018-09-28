import React from "react";
import styled from "styled-components";
import { inputFactory, onChange } from "./Input";
import {
  labelColor,
  minimumInputHeight,
  smallText,
  errorColor,
  labelBackgroundColor
} from "../common/variables";

const size = props => props.theme.factor * 20;
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

const Nob = styled.label`
  display: inline-block;
  position: relative;
  width: ${size}px;
  height: ${size}px;
  cursor: pointer;
  background: ${labelBackgroundColor};
  &:after {
    content: "";
    width: ${props => (props.theme.factor * 20) / 2 + 2}px;
    height: 5px;
    position: absolute;
    top: 4px;
    left: 4px;
    border: 3px solid ${labelColor};
    border-top: none;
    border-right: none;
    background: transparent;
    opacity: 0;
    transform: rotate(-45deg);
  }
  &:hover::after {
    opacity: 0.3;
  }
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  &[type="checkbox"] {
    visibility: hidden;
    &:checked + label:after {
      opacity: 1;
    }
  }
`;

export default inputFactory(props => {
  return (
    <Wrapper>
      <Nob>
        <Checkbox
          value={!!props.value}
          checked={!!props.value}
          onChange={onChange.bind(this, value =>
            props.valueChanged(value === "true")
          )}
        />
      </Nob>
      <Label>{props.label}</Label>
    </Wrapper>
  );
}, true);
