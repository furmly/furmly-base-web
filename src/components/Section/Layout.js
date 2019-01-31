import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { labelBackgroundColor, containerPadding } from "../common/variables";

const Line = styled.div`
  position: absolute;
  height: 0.8px;
  width: 100%;
  bottom: 0;
  background-color: ${labelBackgroundColor};
`;
const Frame = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: ${containerPadding}px;
`;
const Layout = props => {
  return (
    <Frame>
      {props.header}
      {props.content}
      <Line />
    </Frame>
  );
};

Layout.propTypes = {
  content: PropTypes.element,
  header: PropTypes.element
};

export default Layout;
