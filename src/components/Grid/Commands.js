import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IconButton } from "../common/components/Button";

const CommandsContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;
const NewButton = props => <IconButton label={"Add"} {...props} />;
const Commands = props => {
  return (
    <CommandsContainer>
      {props.canAddOrEdit && (
        <React.Fragment>
          <NewButton onClick={() => props.showItemView("NEW")} icon="plus" />
          &nbsp;|&nbsp;
        </React.Fragment>
      )}
      {props.commands.length > 0 && (
        <IconButton
          icon="caret-square-down"
          onClick={props.openCommandMenu}
          label={"Do something"}
        />
      )}
    </CommandsContainer>
  );
};

Commands.propTypes = {
  commands: PropTypes.array,
  showItemView: PropTypes.func.isRequired,
  canAddOrEdit: PropTypes.bool,
  openCommandMenu: PropTypes.func.isRequired
};

export default Commands;
