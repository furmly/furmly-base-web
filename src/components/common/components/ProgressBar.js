import React from "react";
import styled from "styled-components";
import { Spring, animated } from "react-spring/renderprops";
import { inputColor } from "../variables";
import { spin, loader } from "../animations";

const Wrapper = styled(animated.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: red;
`;
const Spinner = styled.svg`
  height: 32px;
  fill: ${props => props.color || inputColor(props)};
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
    <Spring
      from={{ transform: "translateY(10px)" }}
      to={{ transform: "translateY(0px)" }}
    >
      {style => <Wrapper style={style}>Loading...</Wrapper>}
    </Spring>
  );
};
export default Indeterminate;
