import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { StyledIconButton } from "../common/components/Button";
import { containerPadding } from "../common/variables";

const FilterButton = styled(StyledIconButton)`
  margin: ${containerPadding}px;
`;
const Filter = props => {
  const { actionLabel, filter, children } = props;
  return (
    <React.Fragment>
      {children}
      <FilterButton onClick={filter}>{actionLabel}</FilterButton>
    </React.Fragment>
  );
};

Filter.propTypes = {
  filter: PropTypes.func.isRequired,
  actionLabel: PropTypes.string
};
export default Filter;
