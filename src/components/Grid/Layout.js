import React from "react";
import PropTypes from "prop-types";

const Layout = styled.div`
  width: 100%;
`;
const GridLayout = props => {
  const { list, itemView, commandView, commandViewResult, filter } = props;
  const elements = [filter, list, itemView, commandView, commandViewResult];
  return <Layout>{elements}</Layout>;
};

GridLayout.propTypes = {
  filter: PropTypes.element,
  itemView: PropTypes.element,
  list: PropTypes.element,
  commandView: PropTypes.element,
  commandViewResult: PropTypes.element
};
export default GridLayout;
