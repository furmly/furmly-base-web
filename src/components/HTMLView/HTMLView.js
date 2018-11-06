import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IconButton } from "../common/components/Button";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const IframeDiv = styled.div.attrs({ id: "section-to-print" })`
  width: 100%;
  height: 100%;
`;

class Iframe extends Component {
  constructor(props) {
    super(props);
    this.iframe = this.iframe.bind(this);
    this.print = this.print.bind(this);
  }
  componentDidMount() {
    if (this.props.printOnLoad) this.print();
  }
  iframe() {
    return { __html: this.props.html };
  }
  print() {
    window.print();
  }
  render() {
    return (
      <Wrapper>
        <IframeDiv dangerouslySetInnerHTML={this.iframe()} />
        {this.props.canPrint && (
          <IconButton icon="print" onClick={this.print} />
        )}
      </Wrapper>
    );
  }
}

Iframe.propTypes = {
  html: PropTypes.string.isRequired
};
export default Iframe;
