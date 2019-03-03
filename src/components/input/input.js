import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  minimumInputHeight,
  inputPadding,
  highLightColor,
  labelSize,
  inputBackgroundColor,
  inputColor,
  labelColor
} from "../common/variables";
import { hover } from "../common/animations";
import FormDiv from "../common/components/FormDiv";
import FormLabel from "../common/components/Label";
import ErrorText from "../common/components/ErrorText";
import { media } from "../common/utils";
import Icon from "../common/components/Icon";
import withWorker from "../common/components/withWorker";

const ToolTipText = styled.span`
  padding: 8px;
`;
const ToolTip = styled.div`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  & ${ToolTipText} {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: -5px;
    left: 110%;
    opacity: 0;
    transition: opacity 1s;
  }

  &:hover ${ToolTipText} {
    visibility: visible;
    opacity: 1;
  }
`;

const StyledInput = styled.input`
  border: none;
  display: block;
  background-color: ${inputBackgroundColor};
  color: ${inputColor};
  min-height: ${minimumInputHeight}px;
  padding: ${inputPadding};
  width: 100%;
  ${hover};
  &:hover {
    background-color: ${highLightColor};
  }
`;
const FakeLabel = styled.div`
  height: ${labelSize}px;
  ${media.xSmall`height:0px;`};
`;
export const onChangeFactory = (propName = "value") => {
  return (valueChanged, evt, skipPreventDefault) => {
    if (evt.preventDefault && !skipPreventDefault) {
      evt.preventDefault();
    }
    valueChanged(evt.target[propName]);
  };
};
export const onChange = onChangeFactory();

export const inputFactory = (InnerInput, noLabel) => {
  const Input = props => {
    const {
      description,
      errors,
      label,
      reverse = false,
      className,
      labelClassName = ""
    } = props;
    const labelClasses = [
      (errors && errors.length && "furmly-error") || "",
      labelClassName
    ];
    return (
      <FormDiv className={className}>
        {!noLabel ? (
          <FormLabel reverse={reverse} className={labelClasses.join(" ")}>
            {label}
            {description && (
              <ToolTip title={description}>
                &nbsp;
                <Icon icon={"info-circle"} color={labelColor} />
              </ToolTip>
            )}
          </FormLabel>
        ) : (
          <FakeLabel />
        )}
        <InnerInput {...props} />

        {errors && errors.map(x => <ErrorText key={x}>{x}</ErrorText>)}
      </FormDiv>
    );
  };

  return Input;
};

class WorkerMode {
  constructor(element) {
    this.element = element;
    this.worker = element.props.worker;
    this.onmessage = this.onmessage.bind(this);
  }
  componentWillMount() {
    this.worker.addEventListener("message", this.onmessage);
    this.init();
  }
  componentWillUnmount() {
    this.postMessage("destroy");
    this.worker.removeEventListener("message", this.onmessage);
  }
  componentWillReceiveProps(next) {
    if (next.worker !== this.element.props.worker) {
      this.worker = next.worker;
    }
    if (next.component_uid !== this.element.props.component_uid) {
      return this.init(next);
    }
    if (next.value !== this.element.state.value) {
      this.updateValue(next);
    }
    this.postMessage("reset");
  }
  updateValue(props = this.element.props) {
    this.element.setState({ value: props.value || "" });
  }
  init(props = this.element.props) {
    this.postMessage(
      "init",
      {
        component: "input",
        body: {
          idleTimeout: 300
        }
      },
      props
    );
    this.updateValue(props);
  }

  postMessage(type, args, props = this.element.props) {
    this.worker.postMessage({
      type,
      ...args,
      id: props.component_uid
    });
  }
  onmessage({ data: e }) {
    if (e.type == "expired" && e.id == this.element.props.component_uid) {
      this.element.props.valueChanged(this.element.state.value);
    }
  }

  valueChanged(e) {
    this.postMessage("busy");
    this.element.setState({ value: e });
  }
  getValue() {
    return this.element.state.value;
  }
  getProps() {
    return {};
  }
}

class NormalMode {
  constructor(element) {
    this.element = element;
  }
  componentWillMount() {}
  componentWillUnmount() {}
  componentWillReceiveProps() {}
  valueChanged(e) {
    this.element.props.valueChanged(e);
  }
  getValue() {
    return this.element.props.value || "";
  }
  getProps() {
    return {};
  }
}
export class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.valueChanged = this.valueChanged.bind(this);
  }
  componentWillMount() {
    if (!this.props.worker) this.mode = new NormalMode(this);
    else this.mode = new WorkerMode(this);
    this.mode.componentWillMount();
  }
  componentWillUnmount() {
    this.mode.componentWillUnmount();
  }
  componentWillReceiveProps(next) {
    if (next.errors && next.errors.length) {
      this.input.scrollIntoView();
    }
    this.mode.componentWillReceiveProps(next);
  }

  valueChanged(e) {
    const v = this.props.type == "number" ? parseInt(e || "0") : e;
    this.mode.valueChanged(v);
  }
  render() {
    const { type } = this.props;
    const props = {
      type: type,
      innerRef: x => (this.input = x),
      value: this.mode.getValue(),
      onChange: onChange.bind(this, this.valueChanged),
      ...this.mode.getProps()
    };
    return React.createElement(StyledInput, props);
  }
}

Input.propTypes = {
  description: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number
  ]),
  valueChanged: PropTypes.func.isRequired
};

export default inputFactory(withWorker(Input));
