import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { media, getColorFromIntent, INTENTS } from "../../utils";
import {
  minimumInputHeight,
  labelColor,
  elementPadding,
  iconDropShadow,
  highLightColor,
  largerBoxShadow
} from "../../variables";
import { ripple } from "../../animations";
import Icon from "../Icon";

const Button = styled.button`
  ${media.medium`min-width:${props => props.theme.factor * 54}px`};
  ${largerBoxShadow};
  background-color: ${props =>
    getColorFromIntent(props.intent || INTENTS.ACCENT).backgoundColor};
  color: ${props =>
    getColorFromIntent(props.intent || INTENTS.ACCENT).foregroundColor};
  overflow: hidden;
  position: relative;
  cursor: pointer;
  font-weight: bold;
  padding: ${elementPadding}px;
  border: none;
  height: ${minimumInputHeight}px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
  &:before {
    background: rgba(255, 255, 255, 0.09);
    content: "";
    position: absolute;
    top: 0;
    left: 60%;
    width: 100%;
    height: 100%;
    -webkit-transform: skew(10deg);
    -ms-transform: skew(10deg);
    transform: skew(-30deg);
  }
`;

export default Button;
const IconButtonWrapper = styled.button`
  border: none;
  color: ${labelColor};
  background: none;
  cursor: pointer;
  padding: 0 5px;
  svg {
    ${iconDropShadow};
    margin: 0;
  }
  &:hover {
    background-color: ${highLightColor};
  }
`;
export const IconButton = props => (
  <IconButtonWrapper onClick={props.onClick} className={props.className}>
    <Icon
      size={props.iconSize}
      icon={props.icon}
      color={props.color || labelColor}
    />
    {props.label}
  </IconButtonWrapper>
);

export const StyledIconButton = props => {
  const { iconSize, icon, label, rightIcon, ...rest } = props;
  return (
    <Button as="div" {...rest}>
      {icon && <Icon size={iconSize} icon={icon} color={labelColor} />}
      {label || props.children}
      {rightIcon && (
        <Icon size={iconSize} icon={rightIcon} color={labelColor} />
      )}
    </Button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string.isRequired
};
