import React from "react";
import Calendar from "react-calendar/dist/entry.nostyle";
import styled from "styled-components";
import { inputFactory } from "./Input";
import {
  labelBackgroundColor,
  labelColor,
  elementPadding,
  buttonDefaults,
  minimumInputHeight,
  inputPadding,
  highLightColor
} from "../common/variables";
import { hover } from "../common/animations";
import { media } from "../common/utils";
import Icon from "../common/components/Icon";
import StyledPortal from "../common/components/Portal";

const StyledCalendar = styled(Calendar).attrs({
  nextLabel: <Icon icon="angle-right" />,
  next2Label: <Icon icon="angle-double-right" />,
  prevLabel: <Icon icon="angle-left" />,
  prev2Label: <Icon icon="angle-double-left" />
})`
  background-color: white;
  height: 450px;
  width: 350px;
  ${media.xSmall`height:40vh;width:50vh`};
  ${media.small`height:40vh;width:50vh`};
  ${media.xlarge`height:500px;width:400px;`};
  button.react-calendar__tile,
  button.react-calendar__navigation__arrow,
  button.react-calendar__navigation__label {
    border: none;
    padding: ${elementPadding}px;
  }
  .react-calendar__month-view__weekdays__weekday {
    text-align: center;
  }
  button.react-calendar__tile {
    padding: ${elementPadding}px;
    transition: color 1s, background-color 0.6s;
    background-color: transparent;
  }
  button.react-calendar__tile:enabled {
    font-weight: bold;
  }
  button.react-calendar__navigation__label,
  button.react-calendar__navigation__arrow {
    background-color: transparent;
  }
  button.react-calendar__tile:enabled:hover,
  button.react-calendar__tile:enabled:focus {
    background-color: ${labelBackgroundColor};
    color: ${labelColor};
    cursor: pointer;
  }
`;

const RevealButton = styled.button`
  ${buttonDefaults};
  min-height: ${minimumInputHeight}px;
  padding: ${inputPadding};
  width: 100%;
  text-align: left;
  background-color: transparent;
  ${hover};
  &:hover {
    background-color: ${highLightColor};
    // color: ${labelColor};
    cursor: pointer;
  }
  &:hover svg {
    // fill: ${labelColor};
  }
`;

const ActionContainer = styled.div``;

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.submitDate = this.submitDate.bind(this);
    this.dateValueChanged = this.dateValueChanged.bind(this);
    this.portalProps = {
      actionButtons: [
        { content: "Cancel", onClick: this.toggle, key: "CANCEL" }
      ]
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  dateValueChanged(date) {
    const value = this.props.isRange ? date : [date];
    this.setState({ value }, this.submitDate);
  }
  submitDate() {
    let [value, rest] = this.state.value;
    if (this.props.isRange) {
      this.props.fromValueChanged(value);
      this.props.toValueChanged(rest);
    } else this.props.valueChanged(value);

    this.setState({ isOpen: false });
  }
  render() {
    const { isRange, value, toValue, fromValue, minDate, maxDate } = this.props;
    const dateValue = isRange
      ? [fromValue, toValue]
      : typeof value === "string"
        ? new Date(value)
        : value;
    const valueString =
      dateValue &&
      (Array.prototype.isPrototypeOf(dateValue)
        ? value
        : dateValue.toLocaleDateString());
    const elements = [
      <RevealButton key={`reveal-${this.props.name}`} onClick={this.toggle}>
        <Icon icon="calendar" />
        {valueString ||
          (isRange && "Please select valid dates in the range...") ||
          "Please select a date"}
      </RevealButton>,
      <StyledPortal
        key={`portal-${this.props.name}`}
        isOpen={this.state.isOpen}
        {...this.portalProps}
      >
        <StyledCalendar
          selectRange={this.props.isRange}
          minDate={minDate}
          maxDate={maxDate}
          value={dateValue}
          onChange={this.dateValueChanged}
        />
      </StyledPortal>
    ];
    return elements;
  }
}
export default inputFactory(DatePicker);
