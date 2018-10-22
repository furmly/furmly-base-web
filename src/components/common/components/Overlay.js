import styled from "styled-components";
export default styled.div.attrs({
  className: props => props.isOpen && "show"
})`
  width: 100%;
  height: 100%;
  visibility: hidden;
  left: 0;
  top: 0;
  position: absolute;
  background-color: #0000007d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.8s;
  &.show {
    opacity: 1;
    visibility: visible;
  }
  & > * {
    max-width: 50vw;
    max-height: 50vh;
  }
`;
