import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Portal from "../Portal";
import ProgressBar from "../ProgressBar";
import { Label } from "../Label";
import {
  titleText,
  boxShadow,
  minimumModalHeight,
  minimumModalWidth
} from "../../variables";

const Title = styled(Label)`
  display: block;
  position: absolute;
  font-size: ${titleText};
  transform: translateY(-100%);
`;
const ModalContainer = styled.div`
  background-color: white;
  color: red;
  min-height: ${minimumModalHeight};
  min-width: ${minimumModalWidth};
  ${boxShadow};
`;
const Modal = props => {
  const actions = props.actions || [
    { content: "cancel", onClick: () => props.done(false), accent: true },
    {
      onClick: () => props.done(true),
      content: "ok",
      accent: true
    }
  ];
  return (
    /*jshint ignore:start */

    <Portal actionButtons={actions} isOpen={props.visibility}>
      <ModalContainer>
        {props.title && <Title>{props.title}</Title>}
        {(props.busy && <ProgressBar />) || props.template || props.children}
      </ModalContainer>
    </Portal>

    /*jshint ignore:end */
  );
};

Modal.propTypes = {
  visibility: PropTypes.bool,
  done: PropTypes.func.isRequired,
  title: PropTypes.string,
  template: PropTypes.arrayOf(PropTypes.element)
};

export default Modal;
