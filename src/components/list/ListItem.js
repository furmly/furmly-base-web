import React from "react";
import styled from "styled-components";

const ListItemWrapper = styled.button`
  display: flex;
  flex-direction: row;
  width: 100%;
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
`;
export const ListItem = props => {
  <ListItemWrapper onClick={props.onClick} disabled={props.disabled}>
    {props.avatar && <Avatar src={props.avatar} />}
    {props.children}
    {props.rightActions &&
      props.rightActions.length && (
        <ActionButtons>{props.rightActions}</ActionButtons>
      )}
  </ListItemWrapper>;
};
