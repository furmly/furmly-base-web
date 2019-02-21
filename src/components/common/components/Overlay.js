import React from "react";
import styled from "styled-components";
import { Spring, animated } from "react-spring/renderprops";

const AnimatedOverlay = styled(animated.div)`
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.49);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: 0;
  & > * {
    max-width: 50vw;
    max-height: 60vh;
  }
`;

const Overlay = props => (
  <Spring
    native
    from={{ left: "-100vw", opacity: 0 }}
    to={{ opacity: props.isOpen ? 1 : 0 }}
  >
    {style => (
      <AnimatedOverlay
        className={props.className}
        style={{ ...style, left: props.isOpen ? "0" : "-100vw" }}
      >
        {props.isOpen ? props.children : null}
      </AnimatedOverlay>
    )}
  </Spring>
);
export default Overlay;
