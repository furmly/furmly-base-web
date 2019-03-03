import React from "react";
import styled from "styled-components";
import { media } from "../utils";
import {
  labelBackgroundColor,
  labelColor,
  inputPadding,
  highLightColor,
  dividerColor
} from "../variables";

const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // overflow: auto;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  padding: ${inputPadding};
  min-width: 100%;
  text-align: left;
  border-bottom:1px solid ${dividerColor};
`;

const TableRow = styled(Row)`
  &:hover {
    background-color: ${highLightColor};
    cursor: pointer;
  }
  
  
  &:last-child {
    border:none;
  }
`;
const TableHead = styled(Row)`
  p,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  * {
    text-transform: uppercase;
  }
`;
const TableCell = styled.div`
  flex: 1;
`;
export { Table, TableRow, TableHead, TableCell };
