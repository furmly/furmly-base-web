import React from "react";
import config from "client_config";
import styled, { css } from "styled-components";
const DISPLAY = "DISPLAY";
const AVATAR = "AVATAR";
const THUMBNAIL = "THUMBNAIL";
const PROFILE = "PROFILE";
function isRelative(url) {
  return /^(\.)+/.test(url.slice(0, 3)) || /^(\/)+/.test(url);
}
const StyledImage = styled.img`
  ${props => {
    switch (props.uid) {
      case DISPLAY:
        return css`
          ${displayImageSize};
        `;
      case AVATAR:
        return css`
          ${avatarImageSize};
          border-radius: 100%;
        `;
      case THUMBNAIL:
        return `${avatarImageSize};`;
      case PROFILE:
        return `${avatarImageSize};`;
      default:
        return `${defaultImageSize}`;
    }
  }};
`;

export default props => {
  let i = props.args.config.data;
  if (props.args.type == "URL" && isRelative(i)) i = `/_backend/_furmly${i}`;
  if (props.args.type == "REL") i = `${config.imageFolder}${i}`;
  return <StyledImage src={i} />;
};
