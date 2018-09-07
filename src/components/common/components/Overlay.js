import styled from "styled-components";
export default styled.div.attrs({
  className: props => props.isOpen && "show"
})`
    width:100%;
    height:100%
     z-index:-100;
    left:0;
    top:0;
    position:absolute;
    background-color:#0000007d;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    opacity:0;
    transition:opacity 0.5s;
    &.show {
      opacity:1;
      z-index:0;
    }
    & > * {
    max-width:50vw;
    max-height:50vh;
    }
  `;
