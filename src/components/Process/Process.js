import React from "react";
import styled from "styled-components";

const Text = styled.p``;
export const TextView = props => {
  return <Text>{props.text}</Text>;
};

TextView.propTypes = {
  text: PropTypes.string
};

