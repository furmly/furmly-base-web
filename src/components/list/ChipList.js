import React from "react";
import { utils } from "furmly-client";
import styled from "styled-components";
import PropTypes from "prop-types";

import Chip from "../common/components/Chip";

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

const ListImplementation = props => {
  const {
    rowTemplate: { config: { exp } } = {
      config: { exp: "{name}{title}{description}{displayLabel}{_id_display}" }
    },
    disabled,
    rowClicked,
    rowRemoved
  } = props;
  let elements = props.items
    ? props.items.map((x, index) => {
        const rowData = x;
        return (
          <Chip
            key={index}
            onClick={!disabled ? e => rowClicked(index) : undefined}
            onRemove={
              !disabled
                ? e => {
                    e.stopPropagation();
                    rowRemoved(index);
                  }
                : undefined
            }
            text={utils.formatExpression(exp, rowData)}
            disabled={disabled}
          />
        );
      })
    : null;
  return <List className={props.className}>{elements}</List>;
};

ListImplementation.propTypes = {
  rowTemplate: PropTypes.object,
  items: PropTypes.array,
  rowClicked: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  rowRemoved: PropTypes.func.isRequired
};
export default ListImplementation;
