import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { bodyText } from "../variables";

const Warning = styled.p`
  font-size: ${bodyText}px;
`;

const StyledWarning = props => <Warning>{props.message}</Warning>;
StyledWarning.propTypes = {
  message: PropTypes.string
};

export default Warning;
