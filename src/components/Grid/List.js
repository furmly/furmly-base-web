import React, { Component } from "react";
import styled from "styled-components";
import {
  Table,
  TableCell,
  TableHead,
  TableRow
} from "../common/components/Table";
import {
  smallestText,
  minimumInputHeight,
  secondaryBackgroundColor
} from "../common/variables";
import { getSlice, convertToString } from "../common/utils";
import getPager from "../common/components/Pager";
import { RawCheckbox as Checkbox } from "../Input/checkbox";
import Commands from "./Commands";
import FormDiv from "../common/components/FormDiv";

const ListTable = styled(Table)`
  margin-top: 10px;
  padding-top: ${minimumInputHeight}px;
  position: relative;
`;
const ListFormDiv = styled(FormDiv)`
  background-color: ${secondaryBackgroundColor};
  box-shadow: inset 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
`;
const ToggleCell = styled(TableCell)`
  flex: 0.2;
`;
const NotFoundText = styled.p`
  font-size: ${smallestText};
`;
const renderHeader = props => {
  return props.header || null;
};
const renderFooter = props => {
  return props.footer || null;
};
const isInTemplate = (x, templateConfig) => {
  return !templateConfig || (templateConfig && templateConfig.config[x]);
};

const Wrapper = styled.div``;

const Pager = getPager();

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
    this.setCurrentItems = this.setCurrentItems.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.hasSelectedProps = this.hasSelectedProps.bind(this);
  }
  componentDidMount() {
    this._mounted = true;
    if (!this.props.items && this.props.autoFetch) this.props.more();
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  componentWillReceiveProps(next) {
    //check if there are less items than the page can display.
    if (!next.items && next.autoFetch) this.props.more();
    if (
      next.items &&
      next.items.length &&
      (this.state.page - 1) * next.count >= next.items.length &&
      !next.busy
    ) {
      //go back to the first page;
      this.setState({ page: 1 });
    }
  }
  setCurrentItems(page) {
    this.setState({ page });
  }
  toggleItem(item, value) {
    if (value) {
      this.props.selectItem(item);
    } else {
      this.props.unSelectItem(item);
    }
  }
  renderItem(item, templateConfig) {
    let renderedItem = Object.keys(
      (templateConfig && templateConfig.config) || item
    ).reduce((sum, x) => {
      if (isInTemplate(x, templateConfig))
        sum.push(
          <TableCell key={x}>
            {typeof item[x] == "object"
              ? convertToString(item[x]) || "N/A"
              : (item[x] && "" + item[x]) || "N/A"}
          </TableCell>
        );
      return sum;
    }, []);
    renderedItem.unshift(
      <ToggleCell key={"cell_toggle"}>
        <Checkbox
          value={!!this.props.selectedItems[item._id]}
          valueChanged={value => this.toggleItem(item, value)}
        />
      </ToggleCell>
    );

    return renderedItem;
  }
  toggleSelectAll(value) {
    if (value) this.props.selectAllItems();
    else this.props.clearSelectedItems();
  }
  renderHeader(items, templateConfig, total) {
    let item = items && items.length ? items[0] || {} : {};
    let rows = Object.keys(
      (templateConfig && templateConfig.config) || item
    ).reduce((sum, x) => {
      if (isInTemplate(x, templateConfig))
        return (
          sum.push(
            <TableCell key={x}>
              {templateConfig && templateConfig.config
                ? templateConfig.config[x]
                : x}
            </TableCell>
          ),
          sum
        );

      return sum;
    }, []);
    rows.unshift(
      <ToggleCell key={"selector_head"}>
        <Checkbox
          // reverse={true}
          value={items.length == Object.keys(this.props.selectedItems).length}
          valueChanged={this.toggleSelectAll}
        />
      </ToggleCell>
    );
    return rows;
  }
  hasSelectedProps() {
    return !!Object.keys(this.props.selectedItems).length;
  }
  render() {
    const { start, end } = getSlice(this.state.page, this.props.count);
    const [editCommand, ...commands] = this.props.getCommands() || [];
    const items =
      (this.props.items && this.props.items.slice(start, end)) || [];
    let table =
      this.props.items && this.props.items.length ? (
        <React.Fragment>
          <ListTable>
            <Commands
              canShowCommands={this.hasSelectedProps}
              canAddOrEdit={this.props.canAddOrEdit}
              openCommandMenu={this.props.openCommandMenu}
              showItemView={this.props.showItemView}
              commands={commands}
            />
            <TableHead>
              {this.renderHeader(this.props.items, this.props.templateConfig)}
            </TableHead>
            {items.map((item, idx) => (
              <TableRow
                key={idx}
                onClick={() => this.props.execCommand(editCommand, item)}
              >
                {this.renderItem(item, this.props.templateConfig)}
              </TableRow>
            ))}
          </ListTable>
          <Pager
            {...this.state}
            count={this.props.count}
            items={this.props.items}
            total={this.props.total}
            more={this.props.more}
            setCurrentItems={this.setCurrentItems}
          />
        </React.Fragment>
      ) : (
        (this.props.items && (
          <ListTable>
            <Commands
              canShowCommands={this.hasSelectedProps}
              canAddOrEdit={this.props.canAddOrEdit}
              openCommandMenu={this.props.openCommandMenu}
              showItemView={this.props.showItemView}
              commands={commands}
            />
            <NotFoundText styleName={"list-text"}>
              We couldnt find anything.
            </NotFoundText>
          </ListTable>
        )) ||
        null
      );

    return (
      <Wrapper>
        {renderHeader(this.props)}
        {table && <ListFormDiv>{table}</ListFormDiv>}
        {renderFooter(this.props)}
      </Wrapper>
    );
  }
}
export default List;
