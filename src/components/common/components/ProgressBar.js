import React from "react";
import styled from "styled-components";
import { spin } from "../animations";
import { progressBarColor } from "../variables";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .spinner {
    animation: ${spin} 0.9s linear infinite;
    color: ${progressBarColor};
    margin-right: 10px;
  }
`;

const FullPage = () => {
  return (
    <Wrapper>
      <span className="spinner">⛬</span>
    </Wrapper>
  );
};

export default FullPage;
