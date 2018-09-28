import React, { Component } from "react";
import styled from "styled-components";
import {
  Table,
  TableCell,
  TableHead,
  TableRow
} from "../common/components/Table";
import { smallestText } from "../common/variables";
import { getPager, getSlice } from "../common/components/utils";

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

const templates = {
  basic: (items, templateConfig) => {
    let item = items && items.length ? items[0] || {} : {};
    return Object.keys(
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
  }
};
const Pager = getPager();

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 5, page: 1 };
    this.setCurrentItems = this.setCurrentItems.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }
  componentDidMount() {
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  componentWillReceiveProps(next) {
    //check if there are less items than the page can display.
    if (
      next.items &&
      next.items.length &&
      (this.state.page - 1) * this.state.count >= next.items.length &&
      !next.busy
    ) {
      //go back to the first page;
      this.setState({ page: 1 });
    }
  }
  setCurrentItems(page) {
    this.setState({ page });
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

    return renderedItem;
  }
  render() {
    const { start, end } = getSlice(this.state.page, this.state.count);
    const items = (this.props.data && this.props.data.slice(start, end)) || [];
    let table =
      this.props.items && this.props.items.length
        ? [
            <Table style={{ marginTop: 10 }}>
              <TableHead>
                {templates.basic(this.props.items, this.props.templateConfig)}
              </TableHead>
              {items.map((item, idx) => (
                <TableRow key={idx}>
                  {renderItem(item, this.props.templateConfig, this.props)}
                </TableRow>
              ))}
            </Table>,
            <Pager
              {...this.state}
              items={this.props.items}
              total={this.props.total}
              more={this.props.more}
              setCurrentItems={this.setCurrentItems}
            />
          ]
        : (this.props.items && (
            <NotFoundText styleName={"list-text"}>
              We couldnt find anything.
            </NotFoundText>
          )) ||
          null;
    if (!table && !this.props.items) {
      setTimeout(() => {
        if (this._mounted && this.props.autoFetch) this.props.more();
      }, 0);

      return (
        <div>
          {renderHeader(this.props)}
          {renderFooter(this.props)}
        </div>
      );
    }

    let allElements = [
      renderHeader(this.props),
      table,
      renderFooter(this.props)
    ];

    if (this.props.canAddOrEdit) {
      allElements.unshift(
        <NewButton onClick={() => this.props.showItemView("NEW")} icon="add" />
      );
    }

    return <Wrapper>{allElements}</Wrapper>;
  }
}
export default List;
