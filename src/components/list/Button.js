import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../common/components/Button/Button";
import { labelSize } from "../common/variables";

const StyledListButton = styled(Button)`
  position: absolute;
  right: 0px;
  height: ${labelSize}px;
  top: 0px;
`;
const ListButton = props => (
  <StyledListButton
    disabled={!!props.disabled}
    icon="add"
    onClick={() => props.click()}
  >
    ADD
  </StyledListButton>
);

ListButton.propTypes = {
  disabled: PropTypes.bool,
  click: PropTypes.func.isRequired
};

export default ListButton;
