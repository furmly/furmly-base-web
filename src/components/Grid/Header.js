import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../common/components/Button";

const HeaderButton = styled(Button)``;
const GridHeader = props => {
  return [
    props.children,
    <HeaderButton icon="search" onClick={props.filter}>
      SEARCH
    </HeaderButton>
  ];
};

GridHeader.propTypes = {
  filter: PropTypes.func.isRequired
};

export default GridHeader;
