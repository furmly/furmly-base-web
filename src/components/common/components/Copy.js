import styled from "styled-components";
import { smallestText } from "../variables";
export default styled.span`
  color: ${props => props.theme.copyColor || "gray"};
  font-size: ${smallestText}px;
  display: block;
`;
