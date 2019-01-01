import React from "react";
import styled from "styled-components";
import { labelBackgroundColor } from "../variables";
import { spin, loader } from "../animations";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Spinner = styled.svg`
  height: 32px;
  fill: ${props => props.color || labelBackgroundColor(props)};
`;
const G = styled.g`
  animation: ${spin} 5s linear infinite;
`;
const Circle = styled.circle`
  fill: none;
  stroke: #000;
  stroke-width: 16;
  animation: ${loader} 2s linear infinite reverse,
    ${spin} 8s steps(4, start) infinite reverse;
`;
const Indeterminate = props => {
  const { className, ...rest } = props;
  return (
    <Wrapper className={className}>
      <Spinner viewBox="-200 -200 400 400" {...rest}>
        <G>
          <Circle r="160" />
        </G>
      </Spinner>
    </Wrapper>
  );
};

export default Indeterminate;
