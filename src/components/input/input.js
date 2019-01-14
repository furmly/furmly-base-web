import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  minimumInputHeight,
  inputPadding,
  highLightColor,
  labelSize,
  inputBackgroundColor,
  inputColor,
  labelColor
} from "../common/variables";
import { hover } from "../common/animations";
import FormDiv from "../common/components/FormDiv";
import FormLabel from "../common/components/Label";
import ErrorText from "../common/components/ErrorText";
import Copy from "../common/components/Copy";
import { media } from "../common/utils";
import Icon from "../common/components/Icon";

const ToolTipText = styled.span`
  padding: 8px;
`;
const ToolTip = styled.div`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  & ${ToolTipText} {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: -5px;
    left: 110%;
    opacity: 0;
    transition: opacity 1s;
  }


  &:hover ${ToolTipText} {
    visibility: visible;
    opacity: 1;
  }
`;

const StyledInput = styled.input`
  border: none;
  display: block;
  background-color: ${inputBackgroundColor};
  color: ${inputColor};
  min-height: ${minimumInputHeight}px;
  padding: ${inputPadding};
  width: 100%;
  ${hover};
  &:hover {
    background-color: ${highLightColor};
  }
`;
const FakeLabel = styled.div`
  height: ${labelSize}px;
  ${media.xSmall`height:0px;`};
`;
export const onChangeFactory = (propName = "value") => {
  return (valueChanged, evt, skipPreventDefault) => {
    if (evt.preventDefault && !skipPreventDefault) {
      evt.preventDefault();
    }
    valueChanged(evt.target[propName]);
  };
};
export const onChange = onChangeFactory();

export const inputFactory = (InnerInput, noLabel) => {
  const Input = props => {
    const { description, errors, label, reverse = false, className } = props;
    const labelClasses = [
      (errors && errors.length && "error") || "",
      (description && "no-indicator") || " "
    ];
    return (
      <FormDiv className={className} title={description}>
        {!noLabel ? (
          <FormLabel reverse={reverse} className={labelClasses.join(" ")}>
            {label}
            {description && (
              <ToolTip>
                &nbsp;
                <Icon icon={"info-circle"} color={labelColor}  />
                <ToolTipText>
                  <Copy>{description}</Copy>
                </ToolTipText>
              </ToolTip>
            )}
          </FormLabel>
        ) : (
          <FakeLabel />
        )}
        <InnerInput {...props} />

        {errors && errors.map(x => <ErrorText key={x}>{x}</ErrorText>)}
      </FormDiv>
    );
  };

  return Input;
};

export const Input = ({ type, value, valueChanged }) => {
  return (
    <StyledInput
      type={type}
      value={value || ""}
      onChange={onChange.bind(this, valueChanged)}
    />
  );
};

Input.propTypes = {
  description: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number
  ]),
  valueChanged: PropTypes.func.isRequired
};

export default inputFactory(Input);
