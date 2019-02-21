import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../common/components/Modal";
import { elementPadding } from "../common/variables";

const Content = styled.h5`
  padding: ${elementPadding}px;
`;
const ConfirmationDialog = props => {
  return (
    <Modal
      className={"confirmation-dialog"}
      title={"Confirm"}
      visibility={props.visibility}
      done={args => {
        if (args) return props.onConfirm();
        props.onCancel();
      }}
    >
      <Content>{props.content}</Content>
    </Modal>
  );
};

ConfirmationDialog.propTypes = {
  visibility: PropTypes.bool,
  content: PropTypes.any.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ConfirmationDialog;
