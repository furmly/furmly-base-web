import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Label } from "../common/components/Label";
import { titleText, bodyText } from "../common/variables";

const AppLabel = styled(Label)`
  text-transform: none;
  font-size: ${props => {
    switch (props.uid) {
      case "TITLE":
        return titleText(props);
      default:
        return bodyText(props);
    }
  }}px;
`;
const CustomLabel = ({ description }) => {
  return <AppLabel>{description}</AppLabel>;
};

CustomLabel.propTypes = {
  description: PropTypes.string.isRequired
};

export default CustomLabel;
