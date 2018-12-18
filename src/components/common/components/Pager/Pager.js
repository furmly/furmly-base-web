import React from "react";
import styled from "styled-components";
import { IconButton } from "../Button/Button";
import { labelColor } from "../../variables";

const NextButtonDefault = props => (
  <IconButton onClick={props.onClick} icon="chevron-right" />
);
const PrevButtonDefault = props => (
  <IconButton onClick={props.onClick} icon="chevron-left" />
);
const ContainerDefault = styled.div``;
const FootnoteDefault = styled.small`
  color: ${labelColor};
`;
const getPager = (
  NextButton = NextButtonDefault,
  PrevButton = PrevButtonDefault,
  Container = ContainerDefault,
  Footnote = FootnoteDefault
) => {
  return ({ count, page, items, total, more, setCurrentItems }) => {
    if (!items || !items.length) return null;

    let pages = Math.floor(total / count) + (total % count > 0 ? 1 : 0),
      prev,
      next;
    if (page - Math.floor(items.length / count) >= 2)
      page = Math.floor(items.length / count);
    if (page < pages)
      next = (
        <NextButton
          onClick={() => {
            setCurrentItems(page + 1);
            if (items.length < (page + 1) * count && items.length < total)
              more();
          }}
        />
      );
    if (page > 1)
      prev = (
        <PrevButton
          onClick={() => {
            setCurrentItems(page - 1);
          }}
        />
      );

    return (
      <Container>
        {prev}
        {next}
        <Footnote>
          {`${page} of ${pages} page(s)`}
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <b>{`Total of ${total} rows.`}</b>
        </Footnote>
      </Container>
    );
  };
};

export default getPager;
