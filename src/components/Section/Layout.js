import React from "react";
import PropTypes from "prop-types";

const Layout = props => {
  return (
    <React.Fragment>
      {props.header}
      {props.content}
    </React.Fragment>
  );
};

Layout.propTypes = {
  content: PropTypes.element,
  header: PropTypes.element
};

export default Layout;
