import React from "react";
import config from "client_config";
import styled, { css } from "styled-components";
import FormDiv from "../common/components/FormDiv";
import {
  defaultImageSize,
  avatarImageSize,
  displayImageSize
} from "../common/utils";
const DISPLAY = "DISPLAY";
const AVATAR = "AVATAR";
const THUMBNAIL = "THUMBNAIL";
const PROFILE = "PROFILE";
function isRelative(url) {
  return /^(\.)+/.test(url.slice(0, 3)) || /^(\/)+/.test(url);
}
const StyledImage = styled.img`
  display: block;
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
        return css`
          ${avatarImageSize};
        `;
      case PROFILE:
        return css`
          ${avatarImageSize};
        `;
      default:
        return css`
          ${defaultImageSize};
        `;
    }
  }};
`;

export default props => {
  let i = props.args.config.data;
  if (props.args.type == "URL" && isRelative(i)) i = `/_backend/_furmly${i}`;
  if (props.args.type == "REL") i = `${config.imageFolder}${i}`;
  return (
    <FormDiv>
      <StyledImage {...props} src={i} />
    </FormDiv>
  );
};
