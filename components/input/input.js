import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormDiv, FormLabel, ErrorText, Copy } from "../common";

const StyledInput = styled.input`
  border: none;
  display: block;
  min-height: ${props =>
    (props.large && props.theme.factor * 10 + 50) || props.theme.factor * 30}px;
  width: 100%;
`;


const Input = ({ description, errors, label, value, valueChanged }) => {
  const onChange = evt => {
    if (evt.preventDefault && typeof evt.preventDefault !== null)
      evt.preventDefault();
    valueChanged(evt.target.value);
  };
  return (
    <FormDiv>
      <FormLabel>{label}</FormLabel>
      <StyledInput value={value} onChange={onChange} />
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

export default Input;
