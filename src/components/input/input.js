import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  minimumInputHeight,
  inputPadding,
  highLightColor,
  labelSize
} from "../common/variables";
import { hover } from "../common/animations";
import FormDiv from "../common/components/FormDiv";
import FormLabel from "../common/components/Label";
import ErrorText from "../common/components/ErrorText";
import Copy from "../common/components/Copy";

const StyledInput = styled.input`
  border: none;
  display: block;
  background-color: transparent;
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
`;
export const onChange = (valueChanged, evt) => {
  if (evt.preventDefault && typeof evt.preventDefault !== null)
    evt.preventDefault();
  valueChanged(evt.target.value);
};

export const inputFactory = (InnerInput, noLabel) => {
  const Input = props => {
    const { description, errors, label } = props;
    return (
      <FormDiv>
        {!noLabel ? (
          <FormLabel className={(errors && errors.length && "error") || ""}>
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
      value={value}
      onChange={onChange.bind(this, valueChanged)}
    />
  );
};

export default inputFactory(Input);
