import React from "react";
import styled from "styled-components";
const StyledListButton = styled(Button)`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;
export const ListButton = props => (
  <StyledListButton
    disabled={!!props.disabled}
    icon="add"
    onClick={() => props.click()}
  />
);
