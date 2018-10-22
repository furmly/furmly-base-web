import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  minimumInputHeight,
  inputPadding,
  highLightColor,
  labelSize,
  inputBackgroundColor
} from "../common/variables";
import { hover } from "../common/animations";
import FormDiv from "../common/components/FormDiv";
import FormLabel from "../common/components/Label";
import ErrorText from "../common/components/ErrorText";
import Copy from "../common/components/Copy";
import { media } from "../common/utils";

const StyledInput = styled.input`
  border: none;
  display: block;
  background-color: ${inputBackgroundColor};
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
    evt.stopPropagation();
    valueChanged(evt.target[propName]);
  };
};
export const onChange = onChangeFactory();

export const inputFactory = (InnerInput, noLabel) => {
  const Input = props => {
    const { description, errors, label } = props;
    return (
      <FormDiv>
        {!noLabel ? (
          <FormLabel
            reverse={true}
            className={(errors && errors.length && "error") || ""}
          >
            {label}
          </FormLabel>
        ) : (
          <FakeLabel />
        )}
        <InnerInput {...props} />
        <Copy>{description}</Copy>
        {errors && errors.map(x => <ErrorText key={x}>{x}</ErrorText>)}
      </FormDiv>
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

export default inputFactory(Input);
