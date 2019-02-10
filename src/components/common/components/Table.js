import React from "react";
import styled from "styled-components";
import { media } from "../utils";
import {
  labelBackgroundColor,
  labelColor,
  inputPadding,
  highLightColor
} from "../variables";

const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  padding: ${inputPadding};
  min-width: 100%;
  text-align: left;
`;

const TableRow = styled(Row)`
  &:nth-child(even) {
    background-color: ${highLightColor};
  }
  &:hover {
    background-color: ${highLightColor};
    cursor: pointer;
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
  background-color: ${labelBackgroundColor};
  color: ${labelColor};
`;
const TableCell = styled.div`
  flex: 1;
`;
export { Table, TableRow, TableHead, TableCell };
