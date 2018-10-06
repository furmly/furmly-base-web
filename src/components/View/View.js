import React from "react";
import styled from "styled-components";
const Container = styled.div``;
const View = props => <Container>{props.children}</Container>;
export default View;
