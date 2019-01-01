import React from "react";
import styled from "styled-components";
import debug from "debug";
import PropTypes from "prop-types";
import { iconSize, elementPadding } from "../variables";
import icons from "../../../icons";

const log = debug("furmly-base:Icon");
const IconContainer = styled.svg`
  width: ${props => props.iconSize || iconSize}px;
  height: ${props => props.iconSize || iconSize}px;
  margin-right: ${elementPadding}px;
  fill: ${props =>
    (typeof props.iconColor == "function" && props.iconColor(props)) ||
    props.iconColor ||
    "auto"};
`;

const Icon = ({ icon, size, color }) => {
  const iconInfo = icons[icon];

  if (!iconInfo) {
    log(`Unknown Icon ${icon}`);
    log(`using default icon`);
    iconInfo = icons.robot;
  }
  return (
    <IconContainer
      iconSize={size}
      viewBox={`0 0 ${iconInfo[0]} ${iconInfo[1]}`}
      iconColor={color}
    >
      <path d={iconInfo[4]} />
    </IconContainer>
  );
};

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons))
};

export default Icon;
