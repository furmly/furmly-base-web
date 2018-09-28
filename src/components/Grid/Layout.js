import React from "react";
import PropTypes from "prop-types";

const Layout = styled.div`
  width: 100%;
`;
const GridLayout = props => {
  const { list, itemView, commandView, commandViewResult } = props;
  const elements = [list, itemView, commandViewResult];

  return <Layout>{elements}</Layout>;
};

GridLayout.propTypes = {
  filter: PropTypes.element,
  list: PropTypes.element,
  commandView: PropTypes.element,
  commandViewResult: PropTypes.element
};
export default GridLayout;
