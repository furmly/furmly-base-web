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
const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  padding: ${inputPadding};
  background-color: ${highLightColor};
  min-width: 100%;
  text-align: left;
`;
const TableHead = styled(TableRow)`
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
