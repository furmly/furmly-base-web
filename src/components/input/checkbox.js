import React from "react";
import styled from "styled-components";
import { inputFactory, onChangeFactory } from "./input";
import {
  labelColor,
  minimumInputHeight,
  smallText,
  errorColor,
  labelBackgroundColor
} from "../common/variables";
import { setupReversal } from "../common/utils";

const onChange = onChangeFactory("checked");
const size = props => props.theme.factor * 20;
const Label = styled.label`
  cursor: pointer;
  vertical-align: middle;
  font-weight: bold;
  font-size: ${smallText}px;
  // text-transform: uppercase;
  display: inline-block;
  transition: background-color 1s;
  &.error {
    background-color: ${errorColor};
  }
`;

const Wrapper = styled.div`
  height: ${minimumInputHeight}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${labelColor};
`;

const tickWidth = props => (props.theme.factor * 20) / 2 + 2;
const Tick = styled.span`
  width: ${tickWidth}px;
  height: 6px;
  position: absolute;
  top: 6px;
  left: 5px;
  border: 3px solid ${setupReversal(labelColor, labelBackgroundColor)};
  border-top: none;
  border-right: none;
  background: transparent;
  opacity: 0;
  transform: rotate(-45deg);
`;
const Nob = styled.span`
  margin-right: ${props => props.theme.factor * 5}px;
  display: inline-block;
  position: relative;
  width: ${size}px;
  height: ${size}px;
  cursor: pointer;
  background: ${setupReversal(labelBackgroundColor, labelColor)};
  &:hover > ${Tick} {
    opacity: 0.3;
  }
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  &[type="checkbox"] {
    visibility: hidden;
    &:checked + ${Tick} {
      opacity: 1;
    }
  }
`;

export const RawCheckbox = props => {
  return (
    <Wrapper onClick={evt => evt.stopPropagation()}>
      <Label>
        <Nob reverse={props.reverse}>
          <Checkbox
            checked={!!props.value}
            onChange={event =>
              onChange(value => props.valueChanged(value), event, true)
            }
          />
          <Tick reverse={props.reverse} />
        </Nob>
        {props.label}
      </Label>
    </Wrapper>
  );
};
export default inputFactory(RawCheckbox, true);
