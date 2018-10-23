import React from "react";
import PropTypes from "prop-types";
import { StyledIconButton } from "../common/components/Button";

const Filter = props => {
  const { actionLabel, filter, children } = props;
  return (
    <React.Fragment>
      {children}
      <StyledIconButton onClick={filter}>{actionLabel}</StyledIconButton>
    </React.Fragment>
  );
};

Filter.propTypes = {
  filter: PropTypes.func.isRequired,
  actionLabel: PropTypes.string
};
export default Filter;
