import styled from "styled-components";
import { formComponentBackgroundColor } from "../variables";
export default styled.div`
  padding: ${props => props.theme.factor * 10}px;
  background-color: ${formComponentBackgroundColor};
`;
