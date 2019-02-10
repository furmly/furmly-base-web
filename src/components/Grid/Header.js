import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { StyledIconButton } from "../common/components/Button";
import { boxShadow, containerPadding, labelColor } from "../common/variables";
import Icon from "../common/components/Icon";
import SubTitle from "../common/components/SubTitle";

const HeaderButton = styled(StyledIconButton)`
  margin: ${containerPadding}px;
`;
const Title = styled(SubTitle)`
  padding: ${containerPadding}px;
  font-weight: bold;
  color: ${labelColor};
`;
const Container = styled.div`
  ${boxShadow};
  border-bottom: rgba(0, 0, 0, 0.18) solid 1px
`;
const GridHeader = props => {
  if (!React.isValidElement(props.children)) return null;
  return (
    <Container>
      <Title>
        <Icon icon="filter" color={labelColor} size={16} />
        Filter
      </Title>
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
