import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";

export default WrappedComponent => {
  class clickHandler extends React.Component {
    constructor(props) {
      super(props);
      this.wrapperRef = React.createRef();
      this.setWrapperRef = this.setWrapperRef.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
      document.addEventListener("click", this.handleClick, false);
    }

    componentWillUnmount() {
      document.removeEventListener("click", this.handleClick, false);
    }
    handleClick(e) {
      if (e.target && !this.wrapperRef.contains(e.target)) {
        this.element.outsideClick(e);
        return;
      }
    }
    setWrapperRef(element, node) {
      if (
        element &&
        (!element.outsideClick || typeof element.outsideClick !== "function")
      ) {
        throw new Error(
          "Component must include outsideClick static click handler"
        );
      }
      this.wrapperRef = node;
      this.element = element;
    }
    render() {
      return <WrappedComponent innerRef={this.setWrapperRef} {...this.props} />;
    }
  }
  return hoistNonReactStatic(clickHandler, WrappedComponent);
};
