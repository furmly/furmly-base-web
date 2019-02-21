import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Copy from "../common/components/Copy";
import ErrorText from "../common/components/ErrorText";
import {
  elementPadding,
  containerPadding,
  inputBackgroundColor
} from "../common/variables";
import StyledLabel from "../common/components/Label";

const StyledFormDiv = styled.div`
  margin: ${containerPadding}px;
  position: relative;
`;
const ListContainer = styled.div`
  background-color: ${inputBackgroundColor};
  min-height: ${props => props.theme.factor * 100}px;
`;
const StyledCopy = styled(Copy)`
  padding: ${elementPadding}px;
`;

const ListLayout = props => {
  const { errors } = props;
  const errorClass = (errors && errors.length && "error") || "";
  return (
    <StyledFormDiv className={errorClass}>
      <StyledLabel className={errorClass}>{props.value}</StyledLabel>
      <ListContainer>
        <StyledCopy>
          {props.description}
          {errors && errors.map(x => <ErrorText key={x}>{x}</ErrorText>)}
        </StyledCopy>
        {props.children}
        {props.list}
      </ListContainer>
      {props.addButton}
      {props.modal}
    </StyledFormDiv>
  );
};

ListLayout.propTypes = {
  value: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.object
  ])
};

export default ListLayout;
