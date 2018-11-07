import React from "react";
import PropTypes from "prop-types";

const Layout = props => {
  const { content, filter } = props;
  return (
    <React.Fragment>
      {filter}
      {content}
    </React.Fragment>
  );
};

Layout.propTypes = {
  filter: PropTypes.element,
  content: PropTypes.element
};
export default Layout;
