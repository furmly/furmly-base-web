import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Portal from "../Portal";
import ProgressBar from "../ProgressBar";
import { titleText } from "../../variables";

const Title = styled.span`
  display: block;
  font-size: ${titleText};
`;
const ModalContainer = styled.div``;
export const Modal = props => {
  const actions = [
    { label: "cancel", onClick: () => props.done(false), accent: true },
    {
      onClick: () => props.done(true),
      label: "ok",
      accent: true
    }
  ];
  return (
    /*jshint ignore:start */

    <Portal actionButtons={actions} isOpen={props.visibility}>
      <ModalContainer>
        {props.title && <Title>{props.title}</Title>}
        {(props.busy && <ProgressBar />) || props.template}
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
