import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { iconSize, elementPadding } from "../variables";
import icons from "../../../icons";

const IconContainer = styled.svg`
  width: ${iconSize}px;
  height: ${iconSize}px;
  margin-right: ${elementPadding}px;
`;

const Icon = ({ icon }) => {
  const iconInfo = icons[icon];
  if (!iconInfo) throw new Error(`Unknown Icon bro ${icon}`);
  return (
    <IconContainer viewBox={`0 0 ${iconInfo[0]} ${iconInfo[1]}`}>
      <path d={iconInfo[4]} />
    </IconContainer>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Icon;
