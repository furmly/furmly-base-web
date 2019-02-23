import React from "react";
import styled from "styled-components";
import { spin, flow } from "../animations";
import Copy from "./Copy";


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fdfeff54;
  .spinner {
    animation: ${spin} 0.9s linear infinite;
    margin-right: 10px;
  }
`;

const FullPage = () => {
  return (
    <Wrapper>
      <span className="spinner">⛬</span>
      {/* <Copy>Loading...</Copy> */}
    </Wrapper>
  );
};

export default FullPage;
