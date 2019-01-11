import styled from "styled-components";
export default styled.div.attrs({
  className: props => (props.isOpen ? "show" : "")
})`
  width: 100%;
  height: 100%;
  left: -100vw;
  top: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.49);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s, left 0s 0.5s;
  & > div {
    opacity: 0;
  }
  &.show,
  &.show > div {
    opacity: 1;
    left: 0;
    transition: opacity 0.5s;
  }
  & > * {
    max-width: 50vw;
    max-height: 60vh;
  }
`;
