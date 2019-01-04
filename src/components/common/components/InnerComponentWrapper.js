import React from "react";
import PropTypes from "prop-types";
const InnerComponentWrapper = props => {
  return (
    <React.Fragment>
      {props.inner}
      {props.extraElements}
    </React.Fragment>
  );
};
InnerComponentWrapper.propTypes = {
  inner: PropTypes.element.isRequired
};
export default InnerComponentWrapper;
