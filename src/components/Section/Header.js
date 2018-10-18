import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Label } from "../common/components/Label";
import SubTitle from "../common/components/SubTitle";
import { containerPadding } from "../common/variables";

const HeaderSubTitle = styled(SubTitle)`
  margin-top: 0px;
  padding: ${containerPadding}px;
`;
const HeaderLabel = styled(Label)`
  margin: 0px ${containerPadding}px;
`;

const Header = props => {
  return (
    <React.Fragment>
      <HeaderLabel>{props.children}</HeaderLabel>
      <HeaderSubTitle>{props.description}</HeaderSubTitle>
    </React.Fragment>
  );
};

Header.propTypes = {
  children: PropTypes.element,
  description: PropTypes.string
};
export default Header;
