import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { iconSize, elementPadding } from "../variables";
import icons from "../../../icons";

const IconContainer = styled.svg`
  width: ${props => props.iconSize || iconSize}px;
  height: ${props => props.iconSize || iconSize}px;
  margin-right: ${elementPadding}px;
`;

const Icon = ({ icon, size }) => {
  const iconInfo = icons[icon];
  if (!iconInfo) throw new Error(`Unknown Icon ${icon}`);
  return (
    <IconContainer
      iconSize={size}
      viewBox={`0 0 ${iconInfo[0]} ${iconInfo[1]}`}
    >
      <path d={iconInfo[4]} />
    </IconContainer>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Icon;
