import React from "react";
import { utils } from "furmly-client";
import styled from "styled-components";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import { IconButton } from "../common/components/Button";
import { camelCaseToWord } from "../common/utils";
const BasicInfoLabel = styled.span``;
const ListDivider = styled.hr``;
const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
`;

export const BasicInfo = ({ rowData, withoutLabel, dataTemplate }) =>
  Object.keys(rowData).reduce((sum, x, index) => {
    if (dataTemplate && !dataTemplate[x]) return sum;

    let displayText = rowData[x];
    let label = dataTemplate ? dataTemplate[x] : camelCaseToWord(x);
    let element = withoutLabel ? (
      <BasicInfoLabel key={index}>{displayText}</BasicInfoLabel>
    ) : (
      <BasicInfoLabel key={index}>
        <b>{label}</b> &nbsp;
        {typeof rowData[x] == "object"
          ? Date.prototype.isPrototypeOf(rowData[x])
            ? rowData[x].toLocaleDateString()
            : "..."
          : displayText}
      </BasicInfoLabel>
    );

    sum.push(element);
    return sum;
  }, []);

export const rowTemplates = {
  basic: (
    rowData,
    { withoutLabel, itemClicked, index, dataTemplate, disabled, itemRemoved }
  ) => (
    <ListItem
      key={index}
      onClick={itemClicked}
      disabled={disabled}
      rightActions={[<IconButton icon="trash" onClick={itemRemoved} />]}
    >
      <BasicInfo
        rowData={rowData}
        withoutLabel={withoutLabel}
        dataTemplate={dataTemplate}
        index={index}
      />
    </ListItem>
  ),
  expression: (
    rowData,
    { itemClicked, itemRemoved, dataTemplate, index, disabled }
  ) => (
    <ListItem
      key={index}
      onClick={itemClicked}
      rightActions={[<IconButton icon="trash" onClick={itemRemoved} />]}
      disabled={disabled}
    >
      <p>
        <span style={{ float: "left" }}>
          <b>{"" + (index + 1)}.</b>
          <span>{utils.formatExpression(dataTemplate.exp, rowData)}</span>
        </span>
      </p>
    </ListItem>
  ),
  includesImage: (rowData, { itemClicked, itemRemoved, index, disabled }) => (
    <ListItem
      key={index}
      avatar={image}
      onClick={itemClicked}
      disabled={disabled}
      rightActions={[
        <IconButton icon="trash" onClick={itemRemoved.bind(this, index)} />
      ]}
    >
      <BasicInfo {...rowData} />
    </ListItem>
  )
};

const ListImplementation = props => {
  let rowTemplate =
      rowTemplates[(props.rowTemplate && props.rowTemplate.name) || "basic"],
    elements = props.items
      ? props.items.reduce((sum, x, index) => {
          if (index > 0) sum.push(<ListDivider key={index + "_divider"} />);
          let rowData = Object.assign({}, x);
          return (
            sum.push(
              rowTemplate(rowData, {
                withoutLabel: false,
                index,
                dataTemplate: props.rowTemplate && props.rowTemplate.config,
                itemClicked: !props.disabled
                  ? e => props.rowClicked(index)
                  : undefined,
                itemRemoved: !props.disabled
                  ? e => {
                      e.stopPropagation();
                      props.rowRemoved(index);
                    }
                  : undefined,
                disabled: props.disabled
              })
            ),
            sum
          );
        }, [])
      : null;
  return <List>{elements}</List>;
};

ListImplementation.propTypes = {
  rowTemplate: PropTypes.object,
  items: PropTypes.array,
  rowClicked: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  rowRemoved: PropTypes.func.isRequired
};
export default ListImplementation;
