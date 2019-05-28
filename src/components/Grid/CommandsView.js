import React from "react";
import styled from "styled-components";
import Modal from "../common/components/Modal";
import {
  minimumInputHeight,
  highLightColor,
  inputColor
} from "../common/variables";

const Button = styled.button`
  background: none;
  border: none;
  width: 100%;
  height: ${minimumInputHeight}px;
  color: ${inputColor};
  cursor: pointer;
  &:hover {
    background-color: ${highLightColor};
  }
`;

const CommandsView = props => {
  return (
    <Modal
      id={"commands-dialog"}
      visibility={!!props.visibility}
      title={"What would you like to do ?"}
      done={props.close}
      actions={[
        { content: "cancel", onClick: () => props.close(), accent: true }
      ]}
    >
      {(props.commands &&
        props.commands.map(x => (
          <Button key={x.commandText} onClick={() => props.execCommand(x)}>
            {x.commandText}
          </Button>
        ))) ||
        null}
    </Modal>
  );
};

export default CommandsView;
