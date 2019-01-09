import React from "react";
import styled from "styled-components";
import Button from "../common/components/Button";
const Container = styled.div``;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
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
        <Button>{props.commandLabel}</Button>
      </ButtonContainer>
    </Container>
  );
};
export default View;
