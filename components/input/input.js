import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  FormDiv,
  FormLabel,
  ErrorText,
  Copy,
  minimumInputHeight,
  inputPadding
} from "../common";

const StyledInput = styled.input`
  border: none;
  display: block;
  // font-family: Roboto;
  background-color: transparent;
  min-height: ${minimumInputHeight}px;
  padding: ${inputPadding};
  width: 100%;
`;

export const inputFactory = InnerInput => {
  const Input = props => {
    const { description, errors, label } = props;
    return (
      <FormDiv>
        <FormLabel className={(errors && errors.length && "error") || ""}>
          {label}
        </FormLabel>
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

const Input = ({ type, value, valueChanged }) => {
  const onChange = evt => {
    if (evt.preventDefault && typeof evt.preventDefault !== null)
      evt.preventDefault();
    valueChanged(evt.target.value);
  };
  return <StyledInput type={type} value={value} onChange={onChange} />;
};

export default inputFactory(Input);
