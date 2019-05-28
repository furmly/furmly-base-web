import React from "react";
import Modal from "../common/components/Modal";

const ResultView = props => {
  return (
    <Modal
      id={"commands-result-view"}
      visibility={!!props.visibility}
      done={props.done}
      actions={[{ content: "ok", onClick: () => props.done(), accent: true }]}
    >
      {props.template}
    </Modal>
  );
};
export default ResultView;
