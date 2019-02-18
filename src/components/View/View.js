import React from "react";
import styled from "styled-components";
import { Spring, animated } from "react-spring/renderprops";
import Button from "../common/components/Button";
import { containerPadding } from "../common/variables";

const Container = styled(animated.div)``;
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
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {style => (
        <Container
          style={style}
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
      )}
    </Spring>
  );
};
export default View;
