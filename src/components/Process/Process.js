import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Text = styled.p``;
export const TextView = props => {
  return <Text>{props.text}</Text>;
};

TextView.propTypes = {
  text: PropTypes.string
};
