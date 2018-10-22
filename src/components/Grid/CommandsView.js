import React from "react";
import styled from "styled-components";
import Modal from "../common/components/Modal";
import { minimumInputHeight, highLightColor } from "../common/variables";

const Button = styled.button`
  background: none;
  border: none;
  width: 100%;
  height: ${minimumInputHeight}px;
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
      {props.commands.map(x => (
        <Button onClick={() => props.execCommand(x)}>{x.commandText}</Button>
      ))}
    </Modal>
  );
};

export default CommandsView;
