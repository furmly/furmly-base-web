import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: stretch;
  flex-wrap: wrap;
  
`;

Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};
export default Container;
