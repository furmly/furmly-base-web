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
import { INTENTS, media } from "../../utils";

const Title = styled(Label)`
  display: block;
  position: absolute;
  font-size: ${titleText};
  transform: translateY(-100%);
`;
const ModalContainer = styled.div`
  background-color: white;
  height: 100%;
  ${boxShadow};
  min-height: ${minimumModalHeight};
  min-width: ${minimumModalWidth};
  ${media.xSmall`
  min-width:100%;
`};
`;
const Modal = props => {
  const actions = props.actions || [
    {
      content: "cancel",
      onClick: () => props.done(false),
      intent: INTENTS.DEFAULT
    },
    {
      onClick: () => props.done(true),
      content: "ok"
    }
  ];
  return (
    /*jshint ignore:start */

    <Portal
      portalId={props.id}
      actionButtons={actions}
      isOpen={props.visibility}
    >
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
  id: PropTypes.string,
  template: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.object
  ])
};

export default Modal;
