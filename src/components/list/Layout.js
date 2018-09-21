import React from "react";
import styled from "styled-components";
import Copy from "../common/components/Copy";
import { formLineWidth } from "../common/variables";
import FormDiv from "../common/components/FormDiv";

const StyledFormDiv = styled(FormDiv)`
  min-height: ${props => props.theme.factor * 100}px;
`;

const getTransition = function(delay) {
  return `  
      transition-delay: ${delay};
      transition-property: transform;
      transition-duration: 1s;
      ${StyledFormDiv}:hover & {
          transform: 0;
        }
      `;
};
const Line = styled.div`
  position: absolute;
  height: ${formLineWidth}px;
`;
const Top = styled(Line)`
  width: 100%;
  top: 0px;
  transform: translateX(-100%);
  ${getTransition("100ms")};
`;
const Right = styled(Line)`
  height: 100%;
  top: 0;
  right: 0;
  transform: translateY(-100%);
  ${getTransition("1100ms")};
`;
const Bottom = styled(Line)`
  width: 100%;
  bottom: 0px;
  transform: translateX(100%);
  ${getTransition("2100ms")};
`;

const Left = styled(Line)`
  height: 100%;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  ${getTransition("3100ms")};
`;
export const ListLayout = props => {
  return (
    <StyledFormDiv>
      <Label>{props.value}</Label>
      <Copy>{props.description}</Copy>
      {props.children}
      <Top />
      <Right />
      <Bottom />
      <Left />
    </StyledFormDiv>
  );
};
