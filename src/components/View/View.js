import React from "react";
import styled from "styled-components";
import Button from "../common/components/Button";
import { containerPadding } from "../common/variables";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
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
  return (
    <Container
      className={`view ${
        props.hideSubmit ? "" : "with-button"
      } ${uid} ${className}`}
    >
      {props.children}
      {(!props.hideSubmit && (
        <ButtonContainer className={"button-container"}>
          <Button onClick={props.submit}>{props.commandLabel}</Button>
        </ButtonContainer>
      )) ||
        null}
    </Container>
  );
};
export default View;
