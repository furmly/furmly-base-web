import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Transition, animated } from "react-spring/renderprops";

const Text = styled.p``;
const AnimatedContainer = styled(animated.div)`
  height: 100%;
`;
export const TextView = props => {
  return <Text>{props.text}</Text>;
};

TextView.propTypes = {
  text: PropTypes.string
};

export const Layout = props => {
  const name = props.getCurrentComponentName();
  return props.getCurrentComponent(name);
  // return (
  //   <Transition
  //     items={props.componentNames}
  //     native
  //     from={{ transform: "translate3d(0,-25px,0)", opacity: 0 }}
  //     enter={{ transform: "translate3d(0,0,0)", opacity: 1 }}
  //     leave={{ opacity: 0 }}
  //   >
  //     {com =>
  //       com == name &&
  //       (style => (
  //         <AnimatedContainer style={style}>
  //           {props.getCurrentComponent(name)}
  //         </AnimatedContainer>
  //       ))
  //     }
  //   </Transition>
  // );
};
