import React from "react";
import styled from "styled-components";
import Button from "../common/components/Button";
import { containerPadding } from "../common/variables";
const Container = styled.div``;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  padding: ${containerPadding}px;
`;
const View = props => {
  const uid = props.uid || "";
  const className = props.className || "";
  if (props.hideSubmit)
    return (
      <Container className={`view ${uid} ${className}`}>
        {props.children}
      </Container>
    );
  return (
    <Container className={`view with-button ${uid} ${className}`}>
      {props.children}
      <ButtonContainer>
        <Button onClick={props.submit}>{props.commandLabel}</Button>
      </ButtonContainer>
    </Container>
  );
};
export default View;
