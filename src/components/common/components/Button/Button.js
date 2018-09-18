import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { media } from "../../utils";
import {
  labelBackgroundColor,
  minimumInputHeight,
  labelColor
} from "../../variables";
import { ripple } from "../../animations";
import Icon from "../Icon";

export default styled.button`
  ${media.medium`min-width:${props => props.theme.factor * 54}px`};
  background-color: ${labelBackgroundColor};
  color: ${labelColor};
  overflow: hidden;
  position: relative;
  border: none;
  min-height: ${minimumInputHeight}px;
  &:hover {
    font-weight: bold;
  }
  &:focus:not(:active)::after {
    animation: ${ripple} 1s ease-out;
  }
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
`;

const IconButtonWrapper = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
export const IconButton = props => (
  <IconButtonWrapper onClick={props.onClick}>
    <Icon size={props.iconSize} icon={props.icon} />
  </IconButtonWrapper>
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired
};
