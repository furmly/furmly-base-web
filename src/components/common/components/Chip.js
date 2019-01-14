import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { labelBackgroundColor, labelColor, iconDropShadow } from "../variables";
import { IconButton } from "./Button";

const Wrapper = styled.div`
  max-width: 200px;
  display: inline-block;
  margin-left: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  &:hover {
    ${iconDropShadow};
  }
`;
const Container = styled.div`
  background-color: ${labelBackgroundColor};
  // border-radius: 16px;
  color: ${labelColor};
  display: flex;
  flex-direction: row;
  padding: 8px;
`;
const Text = styled.span`
  flex: 1;
  display: display;
  min-width: 50px;
  margin-right: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const ButtonContainer = styled.div`
  flex: 0.3;
  min-width: 20px;
  display: flex;
  justify-content: flex-end;
  & > button {
    //border-radius: 16px;
  }
  & > button:hover svg {
    fill: red;
    drop-shadow: none;
  }
`;

const Chip = props => {
  return (
    <Wrapper onClick={props.onClick}>
      <Container>
        <Text>{props.text}</Text>
        <ButtonContainer>
          <IconButton
            icon={"trash"}
            color={props.iconColor}
            onClick={props.onRemove}
          />
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
};

Chip.propTypes = {
  text: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onRemove: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Chip;
