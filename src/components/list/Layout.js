import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Copy from "../common/components/Copy";
import ErrorText from "../common/components/ErrorText";
import {
  formLineWidth,
  labelBackgroundColor,
  labelSize,
  formComponentBackgroundColor,
  elementPadding,
  containerPadding,
  errorColor
} from "../common/variables";

import StyledLabel from "../common/components/Label";

const StyledFormDiv = styled.div`
  margin: ${containerPadding}px;
  min-height: ${props => props.theme.factor * 100}px;
  background-color: ${formComponentBackgroundColor};
  position: relative;
`;
const StyledCopy = styled(Copy)`
  padding: ${elementPadding}px;
`;
const BorderAnimationWrapper = styled.div`
  position: absolute;
  top: ${props => labelSize(props) - 2}px;
  height: calc(100% - ${props => labelSize(props) - 2}px);
  width: 100%;
  overflow: hidden;
`;
const transitionDuration = 0.25;

const getTransition = function(delay, transform, reverse) {
  return css`
    transition-delay: ${reverse}s;
    transition-property: transform;
    transition-duration: ${transitionDuration}s;
    transition-function: ease-in;
    ${StyledFormDiv}:hover & {
      transform: ${transform + "(0)"};
      transition: transform ${transitionDuration}s ease-in ${delay}s;
    }
  `;
};
const Line = styled.div`
  position: absolute;
  height: ${formLineWidth}px;
  background-color: ${labelBackgroundColor};
  ${StyledFormDiv}.error & {
    background-color: ${errorColor};
  }
`;
const Top = styled(Line)`
  width: 100%;
  top: 0;
  transform: translateX(-100%);
  ${getTransition(0, "translateX", 3 * transitionDuration)};
`;
const Right = styled(Line)`
  height: 100%;
  width: ${formLineWidth}px;
  top: 0px;
  right: 0;
  transform: translateY(-100%);
  ${getTransition(
    1 * transitionDuration,
    "translateY",
    2 * transitionDuration
  )};
`;
const Bottom = styled(Line)`
  width: 100%;
  bottom: 0px;
  transform: translateX(100%);
  ${getTransition(
    2 * transitionDuration,
    "translateX",
    1 * transitionDuration
  )};
`;

const Left = styled(Line)`
  height: 100%;
  top: 0;
  left: 0;
  width: ${formLineWidth}px;
  transform: translateY(100%);
  ${getTransition(3 * transitionDuration, "translateY", 0)};
`;

const ListLayout = props => {
  const { errors } = props;
  const errorClass = (errors && errors.length && "error") || "";
  return (
    <StyledFormDiv className={errorClass}>
      <StyledLabel className={errorClass}>{props.value}</StyledLabel>
      <StyledCopy>
        {props.description}
        {errors && errors.map(x => <ErrorText key={x}>{x}</ErrorText>)}
      </StyledCopy>
      <BorderAnimationWrapper>
        <Top />
        <Right />
        <Bottom />
        <Left />
      </BorderAnimationWrapper>
      {props.children}
      {props.list}
      {props.addButton}
      {props.modal}
    </StyledFormDiv>
  );
};

ListLayout.propTypes = {
  value: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.object
  ])
};

export default ListLayout;
