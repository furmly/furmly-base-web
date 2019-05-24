import React from "react";
import styled from "styled-components";
import { iconSize } from "../variables";

const IconContainer = styled.i`
  font-size: ${props => props.iconSize || iconSize}px;
  color: ${props =>
    (typeof props.iconColor == "function" && props.iconColor(props)) ||
    props.iconColor ||
    "auto"};
  ${props => props.onClick && "cursor:pointer;"}
`;

const Icon = ({ icon, size, color, className, onClick }) => {
  return (
    <IconContainer
      className={`${className || ""} fas fa-${icon}`}
      iconSize={size}
      iconColor={color}
      onClick={onClick}
    />
  );
};

export default Icon;
