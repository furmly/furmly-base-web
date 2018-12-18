import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { media } from "../common/utils";
import {
  minimumInputHeight,
  inputPadding,
  highLightColor,
  inputColor
} from "../common/variables";

const ListItemWrapper = styled.div`
  color: ${inputColor};
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: ${minimumInputHeight}px;
  padding: ${inputPadding};
  position: relative;
  &[disabled]:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #efefefb0;
  }
  &:hover:not([disabled]) {
    background-color: ${highLightColor};
    cursor: pointer;
  }
`;
const ListContentWrapper = styled.div`
  flex: 0.7;
  display: flex;
`;
const largeAvatarSize = props => props.theme.factor * 65;
const mediumAvatarSize = props => props.theme.factor * 32;

const Avatar = styled.img`
  height: ${largeAvatarSize}px;
  width: ${mediumAvatarSize}px;
  ${media.medium`
     height:${mediumAvatarSize}px;
     width:${mediumAvatarSize}px;
  `};
`;
const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0.3;
  justify-content: flex-end;
`;
const ListItem = props => (
  <ListItemWrapper onClick={props.onClick} disabled={props.disabled}>
    {props.avatar && <Avatar src={props.avatar} />}
    <ListContentWrapper>{props.children}</ListContentWrapper>
    {props.rightActions && props.rightActions.length && (
      <ActionButtons>{props.rightActions}</ActionButtons>
    )}
  </ListItemWrapper>
);

ListItem.propTypes = {
  avatar: PropTypes.string,
  rightAction: PropTypes.arrayOf(PropTypes.element),
  disabled: PropTypes.bool
};

export default ListItem;
