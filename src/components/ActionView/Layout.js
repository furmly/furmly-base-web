import React from "react";
import PropTypes from "prop-types";

const Layout = props => {
  const { content, filter } = props;
  const elements = [filter, content];
  return <React.Fragment>{elements}</React.Fragment>;
};

Layout.propTypes = {
  filter: PropTypes.element,
  content: PropTypes.element
};
export default Layout;
