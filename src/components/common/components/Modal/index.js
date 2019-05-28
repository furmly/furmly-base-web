import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Portal from "../Portal";
import ProgressBar from "../ProgressBar";
import {
  titleText,
  largerBoxShadow,
  minimumModalHeight,
  minimumModalWidth,
  modalBackgroundColor,
  dividerColor,
  labelBackgroundColor,
  labelColor,
  elementPadding
} from "../../variables";
import { INTENTS, media, setupReversal } from "../../utils";

const Title = styled.label`
  background-color: ${setupReversal(labelBackgroundColor, labelColor)};
  color: ${setupReversal(labelColor, labelBackgroundColor)};
  display: block;
  font-size: ${titleText}px;
  padding: ${elementPadding}px;
`;
const ModalContainer = styled.div`
  overflow-y: overlay;
  background-color: ${modalBackgroundColor};
  // height: 100%;
  height: auto;
  min-width: ${minimumModalWidth};
  border-bottom: ${dividerColor} solid 1px;
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
      className={props.className}
      portalId={props.id}
      actionButtons={actions}
      isOpen={props.visibility}
      extend={props => css`
        background-color: ${modalBackgroundColor(props)};
        ${largerBoxShadow};
        min-height: ${minimumModalHeight};
      `}
    >
      <ModalContainer className="furmly-scrollable">
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
