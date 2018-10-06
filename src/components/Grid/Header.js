import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../common/components/Button";

const HeaderButton = styled(Button)``;
const Container = styled.div``;
const GridHeader = props => {
  return (
    <Container>
      {props.children}
      <HeaderButton icon="search" onClick={props.filter}>
        SEARCH
      </HeaderButton>
    </Container>
  );
};

GridHeader.propTypes = {
  filter: PropTypes.func.isRequired
};

export default GridHeader;
